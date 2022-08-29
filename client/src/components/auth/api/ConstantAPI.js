import {
    InteractionRequiredAuthError,
    InteractionStatus,
  } from "@azure/msal-browser";
  import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
  import axios from 'axios';



export async function ApiCall2 (accessToken,url) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    
    const config = {
        method: "GET",
        headers: headers
    }
    
    axios
    .get(url, config)
    .then(data => console.log(data.data))
    .catch(error => console.log(error));
};
   


export async function callApi(accessToken,url){
    // console.error('AssetID received in CallApiWithToken: ' + id)
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
  
  
function ProtectedComponent(props) {
    const { instance, inProgress, accounts } = useMsal();
    const [apiData, setApiData] = useState(null);

    if (props.assetid)
    
    useEffect(() => {
        if (!apiData && inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                scopes: ["user.read"],
                account: accounts[0],
            };
        instance
            .acquireTokenSilent(accessTokenRequest)
            .then((accessTokenResponse) => {
                // Acquire token silent success
                let accessToken = accessTokenResponse.accessToken;
                // Call your API with token
                callApi(accessToken, url).then((response) => {
                setApiData(response);
                });
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                instance
                    .acquireTokenPopup(accessTokenRequest)
                    .then(function (accessTokenResponse) {
                    // Acquire token interactive success
                    let accessToken = accessTokenResponse.accessToken;
                    // Call your API with token
                    callApi(accessToken, url).then((response) => {
                        setApiData(response);
                    });
                    })
                    .catch(function (error) {
                    // Acquire token interactive failure
                    console.log(error);
                    });
                }
                console.log(error);
            });
        }
    }, [instance, accounts, inProgress, apiData]);
  
    return (
        <div>
            { fetchData ? <AssetLocationData assetData={fetchData} /> : null }
        </div>
    );
}
  
function App() {
return (
    <AuthenticatedTemplate>
    <ProtectedComponent />
    </AuthenticatedTemplate>
);
}


  