import React from 'react';
import "../styles/new.css";
import { protectedResources } from "./auth/authConfig";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps} from "@mui/material"
import Box from '@mui/material/Box'
export const ProfileData = (props) => {
    const tableRows = Object.entries(props.graphData).map((entry, index) => {
        return (<tr key={index}>
            <td><b>{entry[0]}: </b></td>
            <td>{entry[1]}</td>
        </tr>)
    });

    return (
        <>
        <div className="data-area-div">
            <p>Calling <strong>Microsoft Graph API</strong>...</p>
            <ul>
                <li><strong>resource:</strong> <mark>User</mark> object</li>
                <li><strong>endpoint:</strong> <mark>https://graph.microsoft.com/v1.0/me</mark></li>
                <li><strong>scope:</strong> <mark>user.read</mark></li>
            </ul>
            <p>Contents of the <strong>response</strong> is below:</p>
        </div>
        <div className="data-area-div">
            <table>
                <thead>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
        </>
    );
}

export const HelloData = (props) => {
    const tableRows = Object.entries(props.helloData).map((entry, index) => {
        return (<tr key={index}>
            <td><b>{entry[0]}: </b></td>
            <td>{entry[1]}</td>
        </tr>)
    });

    return (
        <>
        <div className="data-area-div">
            <p>Calling <strong>custom protected web API</strong>...</p>
            <ul>
                <li><strong>endpoint:</strong> <mark>{protectedResources.apiHello.endpoint}</mark></li>
                <li><strong>scope:</strong> <mark>{protectedResources.apiHello.scopes[0]}</mark></li>
            </ul>
            <p>Contents of the <strong>response</strong> is below:</p>
        </div>
        <div className="data-area-div">
            <table>
                <thead>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
        </>
    );
}

export const AssetLocationData = (props) => {
    let assetID = props.assetData.data[0][0].assetid
    console.info("AssetID Received in AssetLocationData: " + assetID)
    // console.log(props.assetData.data[0])
    
    const tableContainerSx = {
        border: "10px solid rgba(128,128,128,0.4)",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        borderRadius: 2,
        maxHeight: 500
      };
    return (  
        <Box sx={{ '& button': { m: 1 } }}>
            <TableContainer 
            component={Paper}
            sx={tableContainerSx}
            >  
            <Table  stickyHeader={true}>  
                <TableHead sx={{ "& .MuiTableCell-stickyHeader": {backgroundColor: "primary.main"} }}>  
                <TableRow>  
                    <TableCell align="right">Asset ID</TableCell>  
                    <TableCell align="right">Device Location</TableCell>
                    <TableCell align="right">Serial Number</TableCell>
                    <TableCell align="right">Model Number</TableCell>
                    <TableCell align="right">WH Status</TableCell>  
                    <TableCell  align="right">Device Location Time</TableCell>  
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
                    props.assetData.data[0].map((p, index) => { 
                        return <TableRow 
                            key={index}
                        
                        >  
                        <TableCell align="right">{p.assetid}</TableCell>  
                        <TableCell align="right">{p.devicelocation}</TableCell>  
                        <TableCell align="right">{p.serialnumber}</TableCell>  
                        <TableCell align="right">{p.model_number}</TableCell>  
                        <TableCell align="right">{p.wh_status}</TableCell>  
                        <TableCell align="right">{p.devicelocationtime}</TableCell>  
                    </TableRow>  
                    })  
                } 
                </TableBody> 
            </Table>  
            </TableContainer>  
        </Box>
      );  
}


// export const AssetLocationData = (props) => {
//     const tableRows = Object.entries(props.assetData).map(([entry, index]) => {

//         console.log(index[0])
//         return (
//             <tr key={index[0]}>
//             <td><b>{entry[0]}: </b></td>
//             <td>{entry[1]}</td>
//             </tr>
//         )
//     });

//     return (
//         <>
//         <div className="data-area-div">
//             <p>Calling <strong>custom protected web API</strong>...</p>
//             <ul>
//                 <li><strong>endpoint:</strong> <mark>{protectedResources.apiHello.endpoint}</mark></li>
//                 <li><strong>scope:</strong> <mark>{protectedResources.apiHello.scopes[0]}</mark></li>
//             </ul>
//             <p>Contents of the <strong>response</strong> is below:</p>
//         </div>
//         <div className="data-area-div">
//             <table>
//                 <thead>
//                 </thead>
//                 <tbody>
//                     {tableRows}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
// }



// export const AssetLocationData = (props) => {
//     console.log(props)
//     console.log(props.assetData)
//     console.log(props.assetData.data)
//     console.log(props.assetData.data[0])
//     const results = [];     
   
//     return (
//         <div>
//             {props.assetData.data.map((entry, index) => {
//             return (
//                 <div key={index}>
//                 <h2>Asset ID: {entry.assetid}</h2>
//                 <h2>Serial Number: {entry.serialnumber}</h2>
//                 <hr />
//                 </div>
//             );
//             })}
//             {results}
//         </div>
//         );
// }




