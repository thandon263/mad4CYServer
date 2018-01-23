import React, { Component } from "react";
import firebase from "firebase";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      required: true,
      disabled: true,
      validation: {
        first_name: "",
        last_name: "",
        phone: ""
      }
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  componentWillMount() {
    var database = firebase.database().ref("posts");
    var storageRef = firebase.storage().ref("blog_images/");
  }

  handleImageChange(event) {
    var file = event.target.files[0];
    // Create a storage ref
    var storageRef = firebase.storage().ref("blog_images/" + file.name);

    // Store Url download
    var downloadURLRefs = "";
    // save to state
    // this.setState({
    //   image: downloadURLRefs
    // });

    // Upload file
    var task = storageRef.put(file);

    // Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        uploader.value = percentage;
      },

      function error(err) {
        console.error("Error uploading image.");
      },

      function complete() {
        console.log("Image upload successful!");
        // counter
        var value = 0;
        var url = task.snapshot.downloadURL;

        firebase
          .database()
          .ref("images/" + `${(value += 1)}`)
          .set({
            imageUrl: url
          });
      }
    );
  }

  validate(e) {
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var phone = document.getElementById("phone").value;
    var file_uploader = document.getElementById("file_uploader").value;
    var email = document.getElementById("email").value;
    var time_spent = document.getElementById("time_spent").value;
    var city = document.getElementById("city").value;
    var voice = document.getElementById("voice").value;
    var gender = document.getElementById("gender").value;
    var motivation = document.getElementById("motivation").value;
    var structure = document.getElementById("structure").value;

    if (first_name.length === 0) {
      this.setState({
        validation: {
          first_name: "Please enter First Name"
        }
      });

      e.preventDefault();
      return;
    }

    if (last_name.length === 0) {
      this.setState({
        validation: {
          last_name: "Please enter Last Name"
        }
      });
      e.preventDefault();
      return;
    }

    if (phone.length === 0) {
      this.setState({
        validation: {
          phone_number: "Please enter Phone Number"
        }
      });
      e.preventDefault();
      return;
    }

    if (email.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (time_spent.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (city.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (voice.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (gender.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (motivation.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (structure.length === 0) {
      alert("You must enter a username.");
      e.preventDefault();
      return;
    }

    if (
      structure &&
      motivation &&
      gender &&
      voice &&
      city &&
      time_spent &&
      email &&
      phone &&
      last_name &&
      first_name === 0
    ) {
      this.setState({
        disabled: true
      });
    }
  }

  submitForm() {
    if (this.state.disabled) {
      console.log("Form Submitted!");
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
              <h1>
                <u>Registration Form</u>
              </h1>
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
                    />
                    <span style={{ color: "#e44c65" }}>
                      {this.state.validation.first_name}
                    </span>
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
                    />
                    <span style={{ color: "#e44c65" }}>
                      {this.state.validation.last_name}
                    </span>
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
                  <progress value="0" max="100" id="uploader">
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
                    />
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
                    />
                    <span style={{ color: "#e44c65" }}>
                      {this.state.validation.phone}
                    </span>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  Hours Spent listening to Acapella?
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
                      placeholder="Hours e.g '1 hour'"
                      className="form-control"
                      type="text"
                    />
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
                      type="text"
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
      </div>
    );
  }
}

export default Form;
