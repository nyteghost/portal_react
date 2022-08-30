import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import AssetLocationData from "../../tables/assetLocDisplay"
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import axios from 'axios';


export async function callApi (accessToken, url, userData) {
    // const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
   
    // headers.append("Authorization", bearer);
    
    const config = {
        method: "GET",
        headers: {"Authorization" : bearer
        }
    }
    let assetID = userData.assetID
    let company = userData.Company

    url = url+`${company}/${assetID}`
    return axios (url, config)
    .then(data => data)
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
            // account: accounts[0]
    };

    if (props.assetID){
        console.log()
    } else {
        console.log()
    }

    const accessTokenRequest = {
        scopes: loginRequest.scopes,
        account: account
    };

    useEffect(() => {
        props = JSON.parse(JSON.stringify(props));
        props.Worker = account.name
        props.Company = dbValue
        if (accounts && inProgress === "none" && !apiData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint,props)
                .then(response => setApiData(response));
            })
            .catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiGetAssetLocationProc.scopes,
                        })
                        .then((response) => {
                            callApi(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint,props)
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
                callApi(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint,props)
                    .then(response => setApiData(response))
                    .catch(error => console.log(error))
        })};
    },[accounts, inProgress, instance, props.assetID, dbValue]);
    return (
        <div>
            { apiData ? <AssetLocationData assetData={apiData} /> : null }
        </div>
    );
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

  