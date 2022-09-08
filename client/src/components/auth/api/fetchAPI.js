import {protectedResources, loginRequest} from "../authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from 'axios';
import WarehouseOpsTable from "../../tables/warehouseOpsTable"


export function ApiVerify(api){
    const [tableData,setTableData] = useState();
    
    console.log(tableData)
    useEffect(() => {
        if(!tableData) {  
            setTableData(api)
        } else if(tableData){setTableData(api)}
    },[api.response.data.returnData[0][0].time])
    console.log(tableData)
    if (tableData !== undefined){
        if (tableData.response.status === 200){
            console.log(tableData.response.data.data.affectedRows)
            return (
                    <div><WarehouseOpsTable props={tableData}/></div>
                );
            }} 
        //     else {
        //     let errorMessage = tableData.response.data.message
        //     return(
        //         <div style={{textAlign: 'center', fontSize: 30, border: 1,position:'relative'}}>Error: {errorMessage}</div>
        //     )
        // } 
    };

function ProtectedComponent(props) {
    const { instance, accounts, inProgress } = useMsal();
    const [tableData, setTableData] = useState(null);
    const account = useAccount(accounts[0] || {});
    const dbValue = localStorage.getItem("database");

    
    async function callApi (accessToken,url,userData) {
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


    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)
    
    
    const authRequest = {
        ...loginRequest,
    };
    
    props = JSON.parse(JSON.stringify(props));
    props.formData.worker = account.name
    props.formData.company = dbValue

    useEffect(() => {
        if (accounts && inProgress === "none" && !tableData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiPostWarehouseOps.endpoint, props.formData)
                    .then(response => setTableData(response));
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
                            callApi(response.accessToken, protectedResources.apiPostWarehouseOps.endpoint, props.formData)
                                .then(response => setTableData(response));
                        })
                        .catch(error => console.log(error));
                    }
                }
            });
        } else if (inProgress === "none" && tableData) {
            instance.acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => {
                callApi(response.accessToken, protectedResources.apiPostWarehouseOps.endpoint, props.formData)
                    .then(response => setTableData(response))
                    .catch(error => console.log(error))
        })};
        // console.log(props.formData)

    },[props.formData.submit]);
     
    console.log(tableData)
    
    // return(
    //     <div>
    //         { tableData ? <ApiVerify response={tableData} /> : null }
    //     </div>
    // )
    
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

  