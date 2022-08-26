import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

import { callApiWithToken } from "../auth/fetch";
import { loginRequest, protectedResources } from "../auth/authConfig";
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { AssetLocationData } from "../../components/DataDisplay";


const  GetData = (props) => {
  let id = props.parentToChild
  console.info("ID Received in GetData: " + id);
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [fetchData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  
  if (setData){
    console.info("setData :" + setData)
  } console.info('No setData yet.')

  const authRequest = {
    ...loginRequest
  };

  useEffect(() => {
    if (account && inProgress === "none" && !fetchData) {
      console.info("Starting search of assetid: " + id);
      setCount(count + 1)
      console.info("Counter for GetData: "+count)
      instance.acquireTokenSilent({
          scopes: protectedResources.apiGetAssetLocationProc.scopes,
          account: account
      }).then((response) => {
          callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint)
            .then(response => setData(response)); 
      }).catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
            console.error('error instanceof InteractionRequiredAuthError')
              if (account && inProgress === "none") {
                  instance.acquireTokenPopup({
                      scopes: protectedResources.apiGetAssetLocation.scopes,
                  }).then((response) => {
                      callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint)
                          .then(response => setData(response));
                  }).catch(error => console.log(error));
              }
          }
      });
    } 
  },[account, inProgress, instance, id]);
  
  if (fetchData) {console.log("Fetch Data: AssetID-"+ fetchData.data[0][0].assetid)}
  
  
  return (
    <div>
      { fetchData ? <AssetLocationData assetData={fetchData} /> : null }
    </div>
  );
    
};




const DataGet = (props) => {
  let id = props.parentToChild
  console.info("ID Received in dataGet: " + id);

  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [fetchData, setData] = useState(null);

  const authRequest = {
    ...loginRequest
  };
  useEffect(() => {
    if (account && inProgress === "none"){
      console.info('Account and inProgress are set to none')
      
        console.info("Fetch Data: Empty")
        instance.acquireTokenSilent({
          scopes: protectedResources.apiGetAssetLocationProc.scopes,
          account: account
        }).then((response) => {
            callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint)
            .then(response => setData(response))
          }).catch((error) => {
              // in case if silent token acquisition fails, fallback to an interactive method
              if (error instanceof InteractionRequiredAuthError) {
                console.error('error instanceof InteractionRequiredAuthError')
                  if (account && inProgress === "none") {
                      instance.acquireTokenPopup({
                          scopes: protectedResources.apiGetAssetLocation.scopes,
                      }).then((response) => {
                          callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint)
                              .then(response => setData(response));
                        }).catch(error => console.log(error));
                  }
              } 
            });
      
    } else if (account && inProgress !== "none") {
      console.info('Account and inProgress are set.')
      
    }
  },[account, inProgress, instance, id]);

  return (
    <div>
      { fetchData ? <AssetLocationData assetData={fetchData} /> : null }
    </div>
  );
}

export const Hello = (props) => {
  let id = props.parentToChild
  console.info(' ')
  console.info("assetID sent to Hello: "+ id)
  const authRequest = {
      ...loginRequest
  };

  return (
      <MsalAuthenticationTemplate 
          interactionType={InteractionType.Redirect} 
          authenticationRequest={authRequest}>
          {/* { id ? <GetData parentToChild={id} /> : null } */}
          { id ? <DataGet parentToChild={id} /> : null }
      </MsalAuthenticationTemplate>
    )
};


  
