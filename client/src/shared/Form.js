import React, { Component } from "react";
import firebase from "firebase";
import Snackbar from "material-ui/Snackbar";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      required: true,
      disabled: true,
      open: false,
      error: {},
      message: "",
      photoUrl: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  componentWillMount() {
    var database = firebase.database().ref("people");
    var storageRef = firebase.storage().ref("profile_images");
  }

  handleImageChange(event) {
    // listen for file selection
    var file = event.target.files[0];
    console.log("Value of the Uploaded.", file);

    // Create a storage reference
    var storageRef = firebase.storage().ref("profile_images/" + file.name);

    // Upload a file
    var uploadTask = storageRef.put(file);

    var downloadURL = "";

    // Update progress bar
    uploadTask.on(
      "state_changed",

      function progress(snapshot) {
        var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;

        uploader.value = percentage;
      },

      function error(err) {
        console.error("Loading unsuccessful!");
        alert("Loading not Successful, Try again.");
      },

      function complete() {
        downloadURL = uploadTask.snapshot.downloadURL;
      }
    );

    setTimeout(() => {
      this.setState({
        photoUrl: downloadURL
      });
    }, 5000);
  }

  validateEmail(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    // First Name
    if (!this.fname.value) {
      formIsValid = false;
      errors.this.fname.value = "Cannot be empty";
    }

    if (typeof this.fname.value !== "undefined") {
      if (!this.fname.value.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors.this.fname.value = "only letters";
      }
    }

    // email
    if (!this.email.value) {
      formIsValid = false;
      errors.this.email.value = "Cannot be empty";
    }

    if (typeof this.email.value !== "undefined") {
      let lastAtPos = this.email.value.lastIndexOf("@");
      let lastDotPos = this.email.value.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.email.value.value.indexOf("@@")
        )
      ) {
        formIsValid = false;
        errors.this.email.value = "Email is not valid";
      }
    }

    // Hours Spent
    if (!this.time_spent.value) {
      formIsValid = false;
      errors.this.time_spent.value = "Cannot be empty";
    }

    if (typeof this.time_spent.value !== "undefined") {
      if (!this.time_spent.value.match(/^[a-zA-Z0-9]+$/)) {
        formIsValid = false;
        errors.this.time_spent.value = "only letters";
      }
    }

    this.setState({
      errors: errors
    });

    return formIsValid;
  }

  submitForm(event) {
    event.preventDefault();

    // Get values saved
    var object = {
      personal_information: {
        first_name: this.fname.value,
        last_name: this.lname.value,
        photoUrl: this.state.photoUrl,
        email: this.email.value,
        gender: this.gender.value,
        phone: parseInt(this.phone.value, 10)
      },
      location: {
        city: this.city.value
      },
      specialty: {
        voice: this.voice.value
      },
      about_choir: {
        time_spent: this.time_spent.value,
        motivation: this.motivation.value,
        structure: this.structure.value
      }
    };

    if (object) {
      console.log("Values: ", object);
      // Push the Object to firebase

      // Initialize counter
      var counter = 0;

      // Create a database Reference
      firebase
        .database()
        .ref(
          "profile/" +
            `s2January2018N_${
              object.personal_information.first_name
            }${(counter += 1)}`
        )
        .set(object);

      // on Submit Success only
      this.setState({
        open: true,
        message: "Form Successfully Submitted!"
      });
    } else {
      this.setState({
        open: true,
        message: "Please Complete the Form before Submitting!"
      });
      alert("Form was not Subimitted, Complete all fields");
    }
  }

  render() {
    return (
      <div id="three" style={{ width: "70%", margin: "0 auto" }}>
        <div className="container">
          <form
            className="well form-horizontal"
            action=" "
            method="post"
            id="contact_form"
          >
            <fieldset>
              <h2>
                <i>Registration Form</i>
              </h2>
              <div className="form-group">
                <label className="col-md-4 control-label">First Name</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      required={this.state.required}
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      className="form-control"
                      type="text"
                      ref={input => (this.fname = input)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                  </div>
                </div>
              </div>{" "}
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">Last Name</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      required={this.state.required}
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control"
                      type="text"
                      ref={input => (this.lname = input)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <fieldset>
                <legend>Picture</legend>
                <div className="form-group">
                  <label className="col-md-4 control-label">
                    Upload Profile Picture
                  </label>
                  <progress
                    style={styles.uploader}
                    value="0"
                    max="100"
                    id="uploader"
                  >
                    0%
                  </progress>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user" />
                      </span>
                      <input
                        required={this.state.required}
                        id="file_uploader"
                        name="file_uploader"
                        placeholder="Last Name"
                        className="form-control"
                        accept=".jpg, jpeg, .png"
                        type="file"
                        onChange={this.handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">E-Mail</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope" />
                    </span>
                    <input
                      required={this.state.required}
                      id="email"
                      name="email"
                      placeholder="E-Mail Address"
                      className="form-control"
                      type="text"
                      ref={input => (this.email = input)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">Phone #</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-earphone" />
                    </span>
                    <input
                      id="phone"
                      required={this.state.required}
                      name="phone"
                      placeholder="(845)555-1212"
                      className="form-control"
                      type="text"
                      ref={input => (this.phone = input)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  Number of hours you spend listening to Acapella music a
                  day/week?
                </label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-home" />
                    </span>
                    <input
                      id="time_spent"
                      required={this.state.required}
                      name="time_spent"
                      placeholder="Hours e.g '1 hour a week'"
                      className="form-control"
                      type="text"
                      ref={input => (this.time_spent = input)}
                    />
                    <span style={{ color: "red" }}>{this.state.errors}</span>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">City</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-home" />
                    </span>
                    <input
                      id="city"
                      required={this.state.required}
                      name="city"
                      placeholder="city"
                      className="form-control"
                      defaultValue={"Toronto"}
                      type="text"
                      ref={input => (this.city = input)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">Vocal Part</label>
                <div className="col-md-4 selectContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-list" />
                    </span>
                    <select
                      id="voice"
                      required={this.state.required}
                      name="voice"
                      className="form-control selectpicker"
                      ref={input => (this.voice = input)}
                    >
                      <option value=" ">Please select your Voice</option>
                      <option>Soprano</option>
                      <option>Alto</option>
                      <option>Tenor</option>
                      <option>Bass</option>
                    </select>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">Gender</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-home" />
                    </span>
                    <input
                      id="gender"
                      required={this.state.required}
                      name="gender"
                      placeholder="Gender"
                      className="form-control"
                      type="text"
                      ref={input => (this.gender = input)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  What is your motivation in music
                </label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-globe" />
                    </span>
                    <input
                      id="motivation"
                      required={this.state.required}
                      name="motivation"
                      placeholder="e.g 'harmony in music'"
                      className="form-control"
                      type="text"
                      ref={input => (this.motivation = input)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  There is already a built in structure within MAD Youth choir.
                  Songs have been pre-selected before you start.<br /> Are you
                  willing to work with that kind of order?
                </label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-pencil" />
                    </span>
                    <input
                      id="structure"
                      required={this.state.required}
                      name="structure"
                      placeholder="e.g 'Yes' or 'No'"
                      className="form-control"
                      type="text"
                      ref={input => (this.structure = input)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div
                className="alert alert-success"
                role="alert"
                id="success_message"
              >
                Success <i className="glyphicon glyphicon-thumbs-up" /> Thanks
                for contacting us, we will get back to you shortly.
              </div>
              <div style={{ cursor: "pointer" }} className="form-group">
                <label className="col-md-4 control-label" />
                <a
                  onClick={this.submitForm.bind(this)}
                  className="button special"
                  disabled={this.state.disabled}
                >
                  Register
                </a>
              </div>
            </fieldset>
          </form>
        </div>
        <Snackbar
          open={this.state.open}
          style={styles.snackbar}
          action="Close"
          message={this.state.message}
          autoHideDuration={4000}
          onActionClick={this.handleRequestClose.bind(this)}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    );
  }
}

const styles = {
  uploader: {
    WebkitAppearance: "none",
    appearance: "none"
  },
  snackbar: {
    color: "#76FF03"
  }
};

export default Form;
