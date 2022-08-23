import React, {Component} from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import {Header} from "./components/NavigationBar/NavBar"
import AppRouter from './RouteAssignment'
import "./styles/App.css";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

 class App extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = { apiResponse: "" };
    // }

    // callAPI() {
    //     fetch("http://localhost:5000/testAPI")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }));
    // }

    // componentWillMount() {
    //     this.callAPI();
    // }
    render() {
      return (
        <>
        <AuthenticatedTemplate>
          <AppRouter />
          {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        </AuthenticatedTemplate>
        
  
        <UnauthenticatedTemplate>
          <Header />
          <h5 className="card-title">Please sign-in to see your profile information.</h5>
        
        </UnauthenticatedTemplate>
        </>
    );
    }
  }



export default App;