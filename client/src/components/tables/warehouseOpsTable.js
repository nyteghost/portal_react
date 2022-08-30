import React, { Component } from 'react' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material"
import {protectedResources, loginRequest} from "../auth/authConfig";
import { useMsal, useAccount } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import axios from 'axios';
import Box from '@mui/material/Box'


export async function callApi (accessToken, url) {
    // const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
   
    // headers.append("Authorization", bearer);
    
    const config = {
        method: "GET",
        headers: {"Authorization" : bearer
        }
    }
  
    return axios (url, config)
    .then(data => data)
    .catch(error => console.log(error))
};




const WarehouseOpsTable = (props) => { 
    
 
    
    const tableContainerSx = {
        border: "10px solid rgba(128,128,128,0.4)",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        borderRadius: 2,
        maxHeight: 700
    };


    console.log('Beginning of Creation of Table')
    
    try{
        
        console.log(props.data.data.data[0])
            return (  
                <>  
                    {/* <h1>Total Count for Today {String(props.data.data.data[0].length)}.</h1> */}
                
                    <Box sx={{ '& button': { m: 1 } }}>
                        <TableContainer 
                        component={Paper}
                        sx={tableContainerSx}
                        >  
                        <h1>Total Count for Today {String(props.data.data.data[0].length)}.</h1>
                        <Table  stickyHeader={true}
                        >  
                            <TableHead sx={{ "& .MuiTableCell-stickyHeader": {backgroundColor: "primary.main"} }}>  
                            <TableRow>  
                                 
                                <TableCell align="center">Device Type</TableCell>
                                <TableCell align="center">Asset Number</TableCell>
                                <TableCell align="center">Serial Number</TableCell>
                                <TableCell align="center">Location</TableCell>  
                            </TableRow>  
                            </TableHead> 
                            <TableBody
                                sx={{
                                    "& tr:nth-of-type(2n+1)": {
                                        backgroundColor: "grey.100",
                                    },
                                }}
                            >  
                            {  
                                props.data.data.data[0].reverse().map((p, index) => { 
                                    return <TableRow 
                                        key={index}

                                    >  
                                     
                                    <TableCell align="right">{p.devicetype}</TableCell> 
                                    <TableCell align="right">{p.assetid}</TableCell>  
                                    <TableCell align="right">{p.serial}</TableCell>  
                                    <TableCell align="right">{p.location}</TableCell>  
                                </TableRow>  
                                })  
                            } 
                            </TableBody> 
                        </Table>  
                        </TableContainer>  
                    </Box>
                </>
            );  
        }
        catch (e) { console.error(e); }
      }    


function ProtectedComponentWhTable() {
    // console.info('AssetID received in CallApiWithToken: ' + props.assetID)
    const { instance, accounts, inProgress } = useMsal();
    const [apiData, setApiData] = useState(null);
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

        if (accounts && inProgress === "none" && !apiData) {
            instance
            .acquireTokenSilent({
                scopes: loginRequest.scopes,
                account: account
            })
            .then((response) => { 
                callApi(response.accessToken, protectedResources.apiGetWhoProccedForDay.endpoint)
                .then(response => setApiData(response));
            })
            .catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiGetWhoProccedForDay.scopes,
                        })
                        .then((response) => {
                            callApi(response.accessToken, protectedResources.apiGetWhoProccedForDay.endpoint)
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
                callApi(response.accessToken, protectedResources.apiGetWhoProccedForDay.endpoint)
                    .then(response => setApiData(response))
                    .catch(error => console.log(error))
        })};
    },[accounts, inProgress, instance, dbValue]);
    return (
        <div>
            <WarehouseOpsTable data={apiData} />
        </div>
    );
};

export default ProtectedComponentWhTable



