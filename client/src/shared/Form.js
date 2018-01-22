import React, { Component } from "react";
import firebase from "firebase";

class Form extends Component {
  constructor() {
    super();
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

  render() {
    return (
      <div id="three">
        <div className="container">
          <form
            className="well form-horizontal"
            action=" "
            method="post"
            id="contact_form"
          >
            <fieldset>
              <legend>Register Now!</legend>

              <div className="form-group">
                <label className="col-md-4 control-label">First Name</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      name="first_name"
                      placeholder="First Name"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Last Name</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

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
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control"
                      accept=".jpg, jpeg, .png"
                      type="file"
                      onChange={this.handleImageChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">E-Mail</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope" />
                    </span>
                    <input
                      name="email"
                      placeholder="E-Mail Address"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Phone #</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-earphone" />
                    </span>
                    <input
                      name="phone"
                      placeholder="(845)555-1212"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Address</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-home" />
                    </span>
                    <input
                      name="address"
                      placeholder="Address"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">City</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-home" />
                    </span>
                    <input
                      name="city"
                      placeholder="city"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Vocal Part</label>
                <div className="col-md-4 selectContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-list" />
                    </span>
                    <select name="voice" className="form-control selectpicker">
                      <option value=" ">Please select your Voice</option>
                      <option>Soprano</option>
                      <option>Alto</option>
                      <option>Tenor</option>
                      <option>Bass</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Gender</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-home" />
                    </span>
                    <input
                      name="zip"
                      placeholder="Gender"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

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
                      name="motivation"
                      placeholder="e.g 'harmony in music'"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

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
                      required
                      name="motivation"
                      placeholder="e.g 'Yes' or 'No'"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

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
                <a className="button special">Register</a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
