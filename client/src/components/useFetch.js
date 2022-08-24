import { useState, useEffect } from "react";

import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";

import { loginRequest, protectedResources } from "./auth/authConfig";
import { callApiWithToken } from "./auth/fetch";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, [url]);

//   return [data];
// };

// export default useFetch;


const useFetchData = (id) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [data, setData] = useState(null);
    useEffect(() => {
        if (account && inProgress === "none") {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiHello.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(id, response.accessToken, protectedResources.apiHello.endpoint)
                    .then(response => setData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiHello.scopes,
                        }).then((response) => {
                            callApiWithToken(id, response.accessToken, protectedResources.apiHello.endpoint)
                                .then(response => setData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);
  
    return [data];
  };
  
  export default useFetchData;



// const HelloContent = () => {
//     /**
//      * useMsal is hook that returns the PublicClientApplication instance, 
//      * an array of all accounts currently signed in and an inProgress value 
//      * that tells you what msal is currently doing. For more, visit: 
//      * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
//      */
//     const { instance, accounts, inProgress } = useMsal();
//     const account = useAccount(accounts[0] || {});
//     const [helloData, setHelloData] = useState(null);

//     useEffect(() => {
//         if (account && inProgress === "none" && !helloData) {
//             instance.acquireTokenSilent({
//                 scopes: protectedResources.apiHello.scopes,
//                 account: account
//             }).then((response) => {
//                 callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
//                     .then(response => setHelloData(response));
//             }).catch((error) => {
//                 // in case if silent token acquisition fails, fallback to an interactive method
//                 if (error instanceof InteractionRequiredAuthError) {
//                     if (account && inProgress === "none") {
//                         instance.acquireTokenPopup({
//                             scopes: protectedResources.apiHello.scopes,
//                         }).then((response) => {
//                             callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
//                                 .then(response => setHelloData(response));
//                         }).catch(error => console.log(error));
//                     }
//                 }
//             });
//         }
//     }, [account, inProgress, instance]);
  
//     return (
//         <>
//             {/* { helloData ? <HelloData helloData={helloData} /> : null } */}
//         </>
//     );
// };