import {protectedResources, loginRequest} from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import AssetLocationData from "./DataDisplay"
/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */

export async function callApiWithToken(id,accessToken,url){
    // console.error('AssetID received in CallApiWithToken: ' + id)
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
    };
    let nURL = url + id
    return fetch(nURL, options)
        .then(response => response.json())
        .catch(error => console.log(error));
  }


function SaveToStorage(token) {
    console.info('Got Token')
    const getToken = token
    sessionStorage.setItem('apiToken', getToken);
}


function GetAssetLocation(props) {
    const putToken = sessionStorage.getItem('apiToken');
    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)

    const { instance, accounts, inProgress } = useMsal();
    const [fetchData, setData] = useState(null);

    const authRequest = {
        ...loginRequest,
            account: accounts[0]
    };
    useEffect(() => {
        if(!putToken){
            instance.acquireTokenSilent(authRequest).then((response) => {SaveToStorage(response.accessToken)}).then(
                callApiWithToken(props.assetID, putToken, protectedResources.apiGetAssetLocationProc.endpoint).then(response => setData(response)));
            } else {
                callApiWithToken(props.assetID, putToken, protectedResources.apiGetAssetLocationProc.endpoint).then(response => setData(response))};
        
        
        // // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        // instance.acquireTokenSilent(authRequest).then((response) => {
        //     callApiWithToken(props.assetID, response.accessToken,protectedResources.apiGetAssetLocationProc.endpoint).then(response => setData(response));
        // }).catch((e) => {
        //     instance.acquireTokenPopup(authRequest).then((response) => {
        //         callApiWithToken(props.assetID, response.accessToken,protectedResources.apiGetAssetLocationProc.endpoint).then(response => setData(response));
        //     });
        // });
    },[accounts, inProgress, instance,props.assetID]);
    return (
        <div>
            { fetchData ? <AssetLocationData assetData={fetchData} /> : null }
        </div>
    );
};

export default GetAssetLocation
