import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import AssetLocationData from "./DataDisplay"
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import axios from 'axios';


export async function ApiCall (accessToken,url) {
    // const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
   
    // headers.append("Authorization", bearer);
    
    const config = {
        method: "GET",
        headers: {"Authorization" : bearer
        }
    }
    return axios (url, config)
    .then(data => console.log(data.data))
    .catch(error => console.log(error))
};


function GetAssetLocation(props) {
    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)

    const { instance, accounts, inProgress } = useMsal();
    const [fetchData, setData] = useState(null);
    const account = useAccount(accounts[0] || {});
    
    const authRequest = {
        ...loginRequest,
            // account: accounts[0]
    };

    if (props.assetID){
        console.log()
    } else {
        console.log()
    }

    useEffect(() => {
        if (accounts && inProgress === "none" && !fetchData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiGetAssetLocationProc.scopes,
                account: account
            }).then((response) => { 
                ApiCall(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint+props.assetID)
                .then(response => setData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiGetAssetLocationProc.scopes,
                        }).then((response) => {
                            ApiCall(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint+props.assetID)
                                .then(response => setData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        } else if (fetchData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiGetAssetLocationProc.scopes,
                account: account
            }).then((response) => {
                ApiCall(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint+props.assetID)
                    .then(response => setData(response))
                    .catch(error => console.log(error))
        })};
    },[accounts, inProgress, instance, props.assetID]);
    return (
        <div>
            { fetchData ? <AssetLocationData assetData={fetchData} /> : null }
        </div>
    );
};

export default GetAssetLocation


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

  