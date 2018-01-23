import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Header, SectionOne, SectionTwo, Footer } from "./components/index";
import FormComponent from "./shared/Form";
import firebase from "firebase";
import config from "../../config/dev";
import PageLoader from "./shared/spinner";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

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
        {this.state.loading ? (
          <PageLoader />
        ) : (
          <div>
            <Header />
            <SectionOne />
            <SectionTwo />
            <FormComponent />
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
