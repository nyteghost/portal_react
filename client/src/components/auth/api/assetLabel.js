import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from 'axios';



let apiReturn;
export async function callApi (accessToken,url,userData) {
    const bearer = `Bearer ${accessToken}`;
    const config = {
        method: "POST",
        headers: {"Authorization" : bearer
        }
    }
    
    return axios 
    .post(url, userData ,config)
    .then(response => apiReturn = response)
    .catch(error => console.log(error))
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
        console.log(props.formData)
    },[accounts, inProgress, instance, props.formData.submit]);
     
    console.log(apiData)
    // if (apiData === null){
    //     return(
    //         <div>
    //             <h1>Nothing!</h1>
    //         </div>
    //     )
    // } else if (apiData.data.data.affectedRows === 0) {
    
    //     return (
    //         <div>
    //         <h1>Error in Submission</h1>
    //         </div>
            
    //     );
    // } else if (apiData.data.data.affectedRows === 1) {
    
    //     return (
    //         <div>
    //         <h1>Submitted</h1>
    //         </div>
            
    //     );
    // };
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

  