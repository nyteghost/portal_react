import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

import { callApiWithToken } from "../../auth/fetch";
import { loginRequest, protectedResources } from "../../auth/authConfig";
import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";


const  App = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [fetchData, setData] = useState(null);
  const authRequest = {
    ...loginRequest
};
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  
  const onSubmit = data => {
    console.log(data.assetid);
    if (account && inProgress === "none") {
      instance.acquireTokenSilent({
          scopes: protectedResources.apiGetAssetLocation.scopes,
          account: account
      }).then((response) => {
          callApiWithToken(data.assetid, response.accessToken, protectedResources.apiGetAssetLocation.endpoint)
              .then(response => setData(response));
      }).catch((error) => {
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
              if (account && inProgress === "none") {
                  instance.acquireTokenPopup({
                      scopes: protectedResources.apiGetAssetLocation.scopes,
                  }).then((response) => {
                      callApiWithToken(data.assetid, response.accessToken, protectedResources.apiGetAssetLocation.endpoint)
                          .then(response => setData(response));
                  }).catch(error => console.log(error));
              }
          }
      });
  }
    console.log(fetchData)
  }

  
  return (
          <>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ErrorMessage errors={errors} name="singleErrorInput" />
                <input type="text" placeholder="Asset Number/Serial Number" {...register("assetid", {required: true, maxLength: 80})} />
                <Button type="submit" color="primary" variant="outlined">
                  Submit
                </Button>
              </form>
            </div>
            <div>
            </div>
          </>
  
  );
}

export default App;