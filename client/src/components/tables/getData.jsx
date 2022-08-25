import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

import { callApiWithToken } from "../auth/fetch";
import { loginRequest, protectedResources } from "../auth/authConfig";
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { AssetLocationData } from "../../components/DataDisplay";


// export const  GetData = (props) => {
//   let id = props.parentToChild
  
//   const { instance, accounts, inProgress } = useMsal();
//   const account = useAccount(accounts[0] || {});
//   const [fetchData, setData] = useState(null);
//   const authRequest = {
//     ...loginRequest
//   };
//   useEffect(() => {
//     if (account && inProgress === "none" && !fetchData) {
//       console.log("Starting search of assetid: " + id);
//       instance.acquireTokenSilent({
//           scopes: protectedResources.apiGetAssetLocation.scopes,
//           account: account
//       }).then((response) => {
//           callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocation.endpoint)
//               .then(response => setData(response));   
//       }).catch((error) => {
//           // in case if silent token acquisition fails, fallback to an interactive method
//           if (error instanceof InteractionRequiredAuthError) {
//               if (account && inProgress === "none") {
//                   instance.acquireTokenPopup({
//                       scopes: protectedResources.apiGetAssetLocation.scopes,
//                   }).then((response) => {
//                       callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocation.endpoint)
//                           .then(response => setData(response));
                         
//                   }).catch(error => console.log(error));
//               }
//           }
//       });
//     }
//   },[account, inProgress, instance]);
  
  
  
//   return (
//     <div>
//       { fetchData ? <GetData fetchData={fetchData} /> : null }
//     </div>
//   );
    

// };



const  GetData = (props) => {
  let id = props.parentToChild
  
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [fetchData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const authRequest = {
    ...loginRequest
  };
  useEffect(() => {
    if (account && inProgress === "none" && !fetchData) {
      console.log("Starting search of assetid: " + id);
      instance.acquireTokenSilent({
          scopes: protectedResources.apiGetAssetLocationProc.scopes,
          account: account
      }).then((response) => {
        if (!isLoading){  
          setIsLoading(true);
          callApiWithToken(id, response.accessToken, protectedResources.apiGetAssetLocationProc.endpoint)
          .then(response => setData(response));
        }   
      }).catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
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
  },[fetchData]);
  
  
  
  return (
    <div>
      { fetchData ? <AssetLocationData assetData={fetchData} /> : null }
      
    </div>
  );
    

};

export const Hello = (props) => {
  let id = props.parentToChild
  console.log(id)
  const authRequest = {
      ...loginRequest
  };

  return (
      <MsalAuthenticationTemplate 
          interactionType={InteractionType.Redirect} 
          authenticationRequest={authRequest}>
          { id ? <GetData parentToChild={id} /> : null }
      </MsalAuthenticationTemplate>
    )
};


  
