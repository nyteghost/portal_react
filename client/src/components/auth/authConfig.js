import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "ccda6812-b003-41e8-b8e4-bc2a857bbf20", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/60924edf-0a5e-4596-99cb-ebcf9d2ddb51", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

// Authentication Parameters
const authenticationParameters = {
    scopes: ['User.Read'],
  };

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    graphMe: {
        endpoint: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read"],
    },
    apiHello: {
        endpoint: "http://localhost:5000/hello",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"], // e.g. api://xxxxxx/access_as_user
    },
    apiGetAssetLocation:{
        endpoint: "http://localhost:5000/getAssetLocation?assetid=",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
    },
    apiGetAssetLocationProc:{
        endpoint: "http://localhost:5000/getAssetLoc/",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
    },
    apiGetWhoProccedForDay:{
        endpoint: "http://localhost:5000/getProccessedForDay",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
    },
    apiPostNewReturn:{
        endpoint: "http://localhost:5000/postNewReturn",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
    },
    apiPostK12Return:{
        endpoint: "http://localhost:5000/postK12Return",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
    }
    ,
    apiPostWarehouseOps:{
        endpoint: "http://localhost:5000/postWarehouseOps",
        scopes: ["api://634f7270-5f06-490d-b181-f9b6ce926dfe/access_as_user"]
    }
};

  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
