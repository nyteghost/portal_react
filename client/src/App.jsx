import React, {Component} from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import {Header} from "./components/NavigationBar/NavBar"
import AppRouter from './RouteAssignment'
import "./styles/App.css";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

 class App extends Component {
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