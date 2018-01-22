import React from "react";
import ReactDOM from "react-dom";
import { Header, SectionOne, SectionTwo, Footer } from "./components/index";
import FormComponent from "./shared/Form";
import config from "../../config/keys";

class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId
    });
  }

  render() {
    return (
      <div>
        <Header />
        <SectionOne />
        <SectionTwo />
        <FormComponent />
        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
