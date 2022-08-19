import React, {Component} from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import {Header} from "./components/NavigationBar/NavBar"
import AppRouter from './RouteAssignment'
import "./styles/App.css";
/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

 class App extends Component {
    state = {
      data: null
    };
  
    // componentDidMount() {
    //   this.callBackendAPI()
    //     .then(res => this.setState({ data: res.express }))
    //     .catch(err => console.log(err));
    // }
    //   // fetching the GET route from the Express server which matches the GET route from server.js
    // callBackendAPI = async () => {
    //   const response = await fetch('/express_backend');
    //   const body = await response.json();
  
    //   if (response.status !== 200) {
    //     throw Error(body.message) 
    //   }
    //   return body;
    // };

    render() {
      return (
        <>
        <AuthenticatedTemplate>
        
          <AppRouter />

        </AuthenticatedTemplate>
        
  
        <UnauthenticatedTemplate>
          <Header />
          <h5 className="card-title">Please sign-in to see your profile information.</h5>
        </UnauthenticatedTemplate>
        </>
    );
    }
  }

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;