import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import AssetLocationData from "../../tables/assetLocDisplay"
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import axios from 'axios';

const DeleayComponent = () => {
    const [show, setShow] = useState(false)
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setShow(true)
      }, 5000)
  
      return () => clearTimeout(timeout)
  
    }, [show])
  
    if (!show) return null
  
    return (
        <div>
            <h1>Error</h1>
        </div>
    )
  }

export async function callApi (accessToken,url,userData) {
    const bearer = `Bearer ${accessToken}`;
    const config = {
        method: "POST",
        headers: {"Authorization" : bearer
        }
    }
    return axios 
    .post(url, userData , config)
    .then(response => response)
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
    })
};


function ProtectedComponent(props) {
    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)
    const { instance, accounts, inProgress } = useMsal();
    const [apiData, setApiData] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);
    const account = useAccount(accounts[0] || {});
    const dbValue = localStorage.getItem("database");
    
    

    
    const authRequest = {
        ...loginRequest,
            // account: accounts[0]
    };
    
    useEffect(() => {
        props = JSON.parse(JSON.stringify(props));
        props.formData.Worker = account.name
        props.formData.Company = dbValue
        console.log(props)
        if (accounts && inProgress === "none" && !apiData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiPostNewReturn.endpoint, props.formData)
                    .then(response => setApiData(response));
            })
            .catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance
                        .acquireTokenPopup({
                            scopes: loginRequest.scopes,
                            account: account
                        })
                        .then((response) => {
                            callApi(response.accessToken, protectedResources.apiPostNewReturn.endpoint, props.formData)
                                .then(response => setApiData(response));
                        })
                        
                    }
                }
            });
        } else if (apiData) {
            instance.acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => {
                callApi(response.accessToken, protectedResources.apiPostNewReturn.endpoint, props.formData)
                    .then(response => setApiData(response))
                    .catch(error => console.log(error))
        })};
    },[accounts, inProgress, instance, props.formData.submit]);

    if (apiData !== null && apiData !== undefined) {
        console.log("apiData: " + apiData)
            if (apiData.data.data.affectedRows === 0) {
                return(
                    <div>
                        <h1>Not submitted!</h1>
                    </div>
                )
            } else if (apiData.data.data.affectedRows === 1) {
            
                return (
                    <div>
                    <h1>Submitted</h1>
                    </div>
                    
                );
            };
    } else {
        console.log(apiData)
        return(
        <div>
            <DeleayComponent/>
        </div>
        )
    }
       
}


export default ProtectedComponent


// export async function callApiWithToken(accessToken, url){
//     // console.error('AssetID received in CallApiWithToken: ' + id)
//     const headers = new Headers();
//     const bearer = `Bearer ${accessToken}`;
  
//     headers.append("Authorization", bearer);
  
//     const options = {
//         method: "GET",
//         headers: headers
//     };
    
//     return fetch(url, options)
//         .then(response => response.json())
//         .catch(error => console.log(error));
//   }

  