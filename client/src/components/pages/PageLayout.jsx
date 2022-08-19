import React, { useState} from "react";
import { useMsal } from "@azure/msal-react";
import { ProfileData } from "../auth/ProfileData";
import { callMsGraph } from "../../graph";
import { loginRequest } from "../../authConfig";
import Button from "react-bootstrap/Button";
/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
 export const PageLayout = (props) => {
    
        return (
            <>
                <h5><center>Welcome to the Database of the FUTURE!</center></h5>
                <br />
                <br />
                <center><ProfileContent /></center>
            </>
        );
    };


function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};