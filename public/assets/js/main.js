/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)"
  });

  // Validations
  $("#contact_form")
    .bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
      feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
      },
      fields: {
        first_name: {
          validators: {
            stringLength: {
              min: 2
            },
            notEmpty: {
              message: "Please supply your first name"
            }
          }
        },
        last_name: {
          validators: {
            stringLength: {
              min: 2
            },
            notEmpty: {
              message: "Please supply your last name"
            }
          }
        },
        email: {
          validators: {
            notEmpty: {
              message: "Please supply your email address"
            },
            emailAddress: {
              message: "Please supply a valid email address"
            }
          }
        },
        phone: {
          validators: {
            notEmpty: {
              message: "Please supply your phone number"
            },
            phone: {
              country: "US",
              message: "Please supply a vaild phone number with area code"
            }
          }
        },
        address: {
          validators: {
            stringLength: {
              min: 8
            },
            notEmpty: {
              message: "Please supply your street address"
            }
          }
        },
        city: {
          validators: {
            stringLength: {
              min: 4
            },
            notEmpty: {
              message: "Please supply your city"
            }
          }
        },
        state: {
          validators: {
            notEmpty: {
              message: "Please select your state"
            }
          }
        },
        zip: {
          validators: {
            notEmpty: {
              message: "Please supply your zip code"
            },
            zipCode: {
              country: "US",
              message: "Please supply a vaild zip code"
            }
          }
        },
        comment: {
          validators: {
            stringLength: {
              min: 10,
              max: 200,
              message:
                "Please enter at least 10 characters and no more than 200"
            },
            notEmpty: {
              message: "Please supply a description of your project"
            }
          }
        }
      }
    })
    .on("success.form.bv", function(e) {
      $("#success_message").slideDown({ opacity: "show" }, "slow"); // Do something ...
      $("#contact_form")
        .data("bootstrapValidator")
        .resetForm();

      // Prevent form submission
      e.preventDefault();

      // Get the form instance
      var $form = $(e.target);

      // Get the BootstrapValidator instance
      var bv = $form.data("bootstrapValidator");

      // Use Ajax to submit form data
      $.post(
        $form.attr("action"),
        $form.serialize(),
        function(result) {
          console.log(result);
        },
        "json"
      );
    });

  $(function() {
    var $window = $(window),
      $body = $("body");

    // Disable animations/transitions until the page has loaded.
    $body.addClass("is-loading");

    $window.on("load", function() {
      window.setTimeout(function() {
        $body.removeClass("is-loading");
      }, 0);
    });

    // Touch mode.
    if (skel.vars.mobile) $body.addClass("is-touch");

    // Fix: Placeholder polyfill.
    $("form").placeholder();

    // Prioritize "important" elements on medium.
    skel.on("+medium -medium", function() {
      $.prioritize(
        ".important\\28 medium\\29",
        skel.breakpoint("medium").active
      );
    });

    // Scrolly links.
    $(".scrolly").scrolly({
      speed: 2000
    });

    // Dropdowns.
    $("#nav > ul").dropotron({
      alignment: "right",
      hideDelay: 350
    });

    // Off-Canvas Navigation.

    // Title Bar.
    $(
      '<div id="titleBar">' +
        '<a href="#navPanel" class="toggle"></a>' +
        '<span class="title">' +
        $("#logo").html() +
        "</span>" +
        "</div>"
    ).appendTo($body);

    // Navigation Panel.
    $(
      '<div id="navPanel">' +
        "<nav>" +
        $("#nav").navList() +
        "</nav>" +
        "</div>"
    )
      .appendTo($body)
      .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: "left",
        target: $body,
        visibleClass: "navPanel-visible"
      });

    // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
    if (skel.vars.os == "wp" && skel.vars.osVersion < 10)
      $("#titleBar, #navPanel, #page-wrapper").css("transition", "none");

    // Parallax.
    // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
    if (skel.vars.browser == "ie" || skel.vars.mobile) {
      $.fn._parallax = function() {
        return $(this);
      };
    } else {
      $.fn._parallax = function() {
        $(this).each(function() {
          var $this = $(this),
            on,
            off;

          on = function() {
            $this.css("background-position", "center 0px");

            $window.on("scroll._parallax", function() {
              var pos =
                parseInt($window.scrollTop()) - parseInt($this.position().top);

              $this.css("background-position", "center " + pos * -0.15 + "px");
            });
          };

          off = function() {
            $this.css("background-position", "");

            $window.off("scroll._parallax");
          };

          skel.on("change", function() {
            if (skel.breakpoint("medium").active) off();
            else on();
          });
        });

        return $(this);
      };

      $window.on("load resize", function() {
        $window.trigger("scroll");
      });
    }

    // Wrappers.
    var $wrappers = $(".wrapper");

    $wrappers.each(function() {
      var $this = $(this),
        on,
        off;

      on = function() {
        if (skel.canUse("transition")) {
          $this.scrollex({
            top: 250,
            bottom: 0,
            initialize: function(t) {
              $this.addClass("inactive");
            },
            terminate: function(t) {
              $this.removeClass("inactive");
            },
            enter: function(t) {
              $this.removeClass("inactive");
            }

            // Uncomment the line below to "rewind" when this wrapper scrolls out of view.

            //leave:	function(t) { $this.addClass('inactive'); },
          });
        }
      };

      off = function() {
        if (skel.canUse("transition")) $this.unscrollex();
      };

      skel.on("change", function() {
        if (skel.breakpoint("medium").active) off();
        else on();
      });
    });

    // Banner.
    var $banner = $("#banner");

    $banner._parallax();
  });
})(jQuery);
