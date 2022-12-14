import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import {protectedResources, loginRequest} from "../authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import OpsTable from "../../tables/warehouseOpsTable"


async function callApi (accessToken,url,dbValue) {
    const bearer = `Bearer ${accessToken}`;
    const config = {
        method: "POST",
        headers: {"Authorization" : bearer
        }
    }

    const userData = {
        Company: dbValue
    }

    console.log(userData)
    return axios 
    .post(url, userData ,config)
    .then(response => response)
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return(
                error.response
            )
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

function ProtectedComponentTable(props) {
    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)
    const { instance, accounts, inProgress } = useMsal();
    const [apiData, setApiData] = useState(null);
    const account = useAccount(accounts[0] || {});
    const dbValue = localStorage.getItem("database");
    
    const authRequest = {
        ...loginRequest,
    };

    useEffect(() => {
        if (accounts && inProgress === "none" && !apiData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiGetWhoProccedForDay.endpoint, dbValue)
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
                            callApi(response.accessToken, protectedResources.apiGetWhoProccedForDay.endpoint, dbValue)
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
                callApi(response.accessToken, protectedResources.apiGetWhoProccedForDay.endpoint, dbValue)
                    .then(response => setApiData(response))
                    .catch(error => console.log(error))
        })};
        // console.log(props.formData)
    },[]);
    return(<OpsTable response={apiData}/>)
};

export default ProtectedComponentTable
