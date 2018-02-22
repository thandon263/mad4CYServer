import React, { Component } from "react";
import firebase from "firebase";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      required: true,
      disabled: true,
      open: false,
      title: "",
      error: {},
      message: "",
      photoUrl: "",

      first_name: "",
      last_name: "",
      description: "",
      email: "",
      phone: "",
      time_spent: "",
      city: "",
      vocal: "",
      motivation: "",
      structure: "",
      termsAndConditions: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
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

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleChangeFirstName(event, value) {
    this.setState({
      first_name: event.target.value
    });
  }

  handleChangeLastName(event, value) {
    this.setState({
      last_name: event.target.value
    });
  }

  handleChangeDescription(event, value) {
    this.setState({
      description: event.target.value
    });
  }

  handleChangeEmail(event, value) {
    this.setState({
      email: event.target.value
    });
  }

  handleChangePhone(event, value) {
    this.setState({
      phone: event.target.value
    });
  }

  handleChangeTimeSpent(event, value) {
    this.setState({
      time_spent: event.target.value
    });
  }

  handleChangeCity(event, value) {
    this.setState({
      city: event.target.value
    });
  }

  handleChangeVocal(event, value) {
    this.setState({
      vocal: event.target.value
    });
  }

  handleChangeMotivation(event, value) {
    this.setState({
      motivation: event.target.value
    });
  }

  handleChangeStructure(event, value) {
    this.setState({
      structure: event.target.value
    });
  }

  handleChangeTNC(event, value) {
    this.setState({
      termsAndConditions: event.target.value
    });
  }

  validations(data) {
    if (
      (!this.state.first_name,
      !this.state.last_name,
      !this.state.description,
      !this.state.photoUrl,
      !this.state.email,
      !this.state.city,
      !this.state.vocal,
      !this.state.structure,
      !this.state.termsAndConditions)
    ) {
      this.setState({
        title: "Oops",
        message: "Fill in all the fields to complete the Registration.",
        open: true
      });
    } else if (!this.state.first_name) {
      this.setState({
        title: "Oops",
        message: "Please enter your First name (required) field.",
        open: true
      });
    } else if (!this.state.last_name) {
      this.setState({
        title: "Oops",
        message: "Please enter your Last name (required) field.",
        open: true
      });
    } else if (!this.state.description) {
      this.setState({
        title: "Oops",
        message: "Please enter your description (required) field.",
        open: true
      });
    } else if (!this.state.photoUrl) {
      this.setState({
        title: "Oops",
        message: "Please submit an image (required) field.",
        open: true
      });
    } else if (!this.state.email) {
      this.setState({
        title: "Oops",
        message: "Please enter your email (required) field.",
        open: true
      });
    } else if (!this.state.city) {
      this.setState({
        title: "Oops",
        message: "Please enter your city (required) field.",
        open: true
      });
    } else if (!this.state.vocal) {
      this.setState({
        title: "Oops",
        message: "Please enter your Musical Part (required) field.",
        open: true
      });
    } else if (!this.state.structure) {
      this.setState({
        title: "Oops",
        message: "Complete the 'Commitment to practice' (required) field.",
        open: true
      });
    } else if (!this.state.termsAndConditions) {
      this.setState({
        title: "Oops",
        message:
          "Please fill with 'Yes' or 'No' below if you agree with Terms of Contract (required) field.",
        open: true
      });
    } else {
      firebase
        .database()
        .ref("profile/")
        .push(data);

      this.setState({
        title: "Sent",
        message: "Thank you for completing the form.",
        open: true
      });
    }
  }

  submitForm(event) {
    event.preventDefault();

    // Get values saved
    var object = {
      personal_information: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        photoUrl: this.state.photoUrl,
        email: this.state.email,
        phone: this.state.phone
      },
      description: this.state.description,
      location: {
        city: this.state.city
      },
      specialty: {
        voice: this.state.vocal
      },
      about_choir: {
        time_spent: this.state.time_spent,
        motivation: this.state.motivation,
        structure: this.state.structure
      },
      termsAndConditions: this.state.termsAndConditions
    };

    // Create a database Reference
    this.validations(object);
    // on Submit Success only
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleRequestClose.bind(this)}
        primary={true}
      />,
      <FlatButton
        label="Ok"
        onClick={this.handleRequestClose.bind(this)}
        primary={true}
      />
    ];
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
                <b>Registration Form</b>
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
                      value={this.state.first_name}
                      onChange={this.handleChangeFirstName}
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
                      value={this.state.last_name}
                      onChange={this.handleChangeLastName}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  What makes you interested in the group and your contribution
                  in making the group successful?
                </label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <textarea
                      style={styles.description}
                      required={this.state.required}
                      id="description"
                      name="description"
                      placeholder="Tell us about your interest in the group ..."
                      className="form-control"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleChangeDescription}
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
                        onChange={this.handleImageChange.bind(this)}
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
                      value={this.state.email}
                      onChange={this.handleChangeEmail.bind(this)}
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
                      value={this.state.phone}
                      onChange={this.handleChangePhone.bind(this)}
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
                      value={this.state.time_spent}
                      onChange={this.handleChangeTimeSpent.bind(this)}
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
                      value={this.state.city}
                      onChange={this.handleChangeCity}
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
                      value={this.state.vocal}
                      onChange={this.handleChangeVocal.bind(this)}
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
                      value={this.state.motivation}
                      onChange={this.handleChangeMotivation.bind(this)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  Music is about organization and unity, are you be willing to
                  commit to practice for 3 hours a week at your convenience?
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
                      value={this.state.structure}
                      onChange={this.handleChangeStructure.bind(this)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">
                  Do you Agree with the terms of the contract click{" "}
                  <a
                    target="_blank"
                    href="https://drive.google.com/file/d/11kU61h-inbMqz7Ni-O_4nowRrCQQtw6z/view?usp=sharing"
                  >
                    here
                  </a>{" "}
                  to download the contract.
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
                      value={this.state.termsAndConditions}
                      onChange={this.handleChangeTNC.bind(this)}
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
                >
                  Send
                </a>
              </div>
            </fieldset>
          </form>
        </div>
        <Dialog
          open={this.state.open}
          title={this.state.title}
          actions={actions}
          autoHideDuration={26000}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          {this.state.message}
        </Dialog>
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
  },
  description: {
    resize: "none",
    overflow: "auto",
    width: "100%",
    maxWidth: 680,
    minHeight: 80
  }
};

export default Form;
