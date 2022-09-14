import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from 'axios';
import PrintAssetLabel from "../../pages/assets/assetLabel/createAssetLabel";



let apiReturn;
export async function callApi (accessToken,url,userData) {
    console.log(userData)
    const bearer = `Bearer ${accessToken}`;
    const config = {
        method: "POST",
        headers: {"Authorization" : bearer
        }
    }
    
    return axios 
    .post(url, userData ,config)
    .then(response => apiReturn = response)
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
    const account = useAccount(accounts[0] || {});
    const dbValue = localStorage.getItem("database");
    
    const authRequest = {
        ...loginRequest,
    };
    
    props = JSON.parse(JSON.stringify(props));
    props.formData.worker = account.name
    props.formData.company = dbValue

    useEffect(() => {
        if (accounts && inProgress === "none" && !apiData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiPostAssetLabel.endpoint, props.formData)
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
                            callApi(response.accessToken, protectedResources.apiPostAssetLabel.endpoint, props.formData)
                                .then(response => setApiData(response));
                        })
                        .catch(error => console.log(error));
                    }
                }
            });
        } else if (apiData) {
            instance.acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => {
                callApi(response.accessToken, protectedResources.apiPostAssetLabel.endpoint, props.formData)
                    .then(response => setApiData(response))
                    .catch(error => console.log(error))
        })};
        // console.log(props.formData)
    },[accounts, inProgress, instance, props.formData.submit]);
     
    // console.log(apiData)
    if (apiData === null){
        return(
            <div>
                <h1>Nothing!</h1>
            </div>
        )
    } else if (apiData.data.data.affectedRows !== 0) {
        return (
            <div>
                { apiData ? <PrintAssetLabel assetData={apiData} /> : null }
            </div>

            
        );
    } else if (apiData.data.data.affectedRows === 0) {
        return (
            <div>
                <h1>Error in Submission</h1>
            </div>
        );
    };
};

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

  