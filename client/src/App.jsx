import React, {Component} from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import {Header} from "./components/NavigationBar/NavBar"
import AppRouter from './RouteAssignment'
import { InteractionType } from "@azure/msal-browser";
// import "./styles/App.css";
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { indigo, red ,green, purple } from '@mui/material/colors';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

//  const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: indigo,
//     secondary: {
//       main: '#b9f6ca',
//     },
//   },
// });



const App = () => {
    
  return (
    <>
    <Header />
    {/* <ThemeProvider theme={darkTheme}>
    <CssBaseline /> */}
    <AuthenticatedTemplate interactionType={InteractionType.Redirect}>
      <AppRouter />
      {/* <p className="App-intro">{this.state.apiResponse}</p> */}
    </AuthenticatedTemplate>
    
    <UnauthenticatedTemplate>
      {/* <Header /> */}
      <h5 className="card-title">Please sign-in to see your profile information.</h5>
    
    </UnauthenticatedTemplate>
    {/* </ThemeProvider> */}
    </>
  );
    
}


export default App;