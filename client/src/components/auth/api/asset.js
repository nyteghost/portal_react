import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import AssetLocationData from "../../tables/assetLocDisplay"
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import axios from 'axios';
import LoadingSpinner from "../../../features/spinner/LoadingSpinner"

function ProtectedComponent(props) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);

    async function callApi (accessToken, url, userData) {
        setIsLoading(true)
        const bearer = `Bearer ${accessToken}`;
        const config = {
            method: "GET",
            headers: {"Authorization" : bearer
            }
        }
        let data = await axios(url+`${userData.Company}/${userData.assetID}`, config)
        if (data.status == 200){
            setIsLoading(false)
            console.log(data.data)
            if (data.data.data[0].length > 0){
                return data
            } else {
                return null
            }
        } else {
            setIsLoading(false)
            return null
        }
        
    };

    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const dbValue = localStorage.getItem("database");
      

    const authRequest = {
        ...loginRequest,
            // account: accounts[0]
    };

    const accessTokenRequest = {
        scopes: loginRequest.scopes,
        account: account
    };
    
    useEffect(() => {
        props = JSON.parse(JSON.stringify(props));
        props.formData.Worker = account.name
        props.formData.Company = dbValue
        if (accounts && inProgress === "none" && !apiData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint,props.formData)
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
                            callApi(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint,props.formData)
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
                callApi(response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint,props.formData)
                    .then(response => setApiData(response))
                    .catch(error => console.log(error))
        })};
    },[accounts, inProgress, instance, props.formData.submit]);
    return (
        <div>
            {isLoading ? <LoadingSpinner /> : null}
            { apiData && isLoading === false ? <AssetLocationData assetData={apiData} /> : null }
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

  