import React, {Component} from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import {Header} from "./components/NavigationBar/NavBar"
import AppRouter from './components/NavigationBar/RouteAssignment'
import { InteractionType } from "@azure/msal-browser";
import Alert from "./getAlert"


const App = () => {
    
  return (
    <>
    <Header />
    <AuthenticatedTemplate interactionType={InteractionType.Redirect}>
      <Alert />
      <AppRouter />

    </AuthenticatedTemplate>
    
    <UnauthenticatedTemplate>
    
      <h5 className="card-title">Please sign-in to see your profile information.</h5>
    
    </UnauthenticatedTemplate>
   
    </>
  );
    
}


export default App;