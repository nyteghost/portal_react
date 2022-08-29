import React from 'react';
import { protectedResources } from "../authConfig";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, SxProps} from "@mui/material"
import Box from '@mui/material/Box'


 const AssetLocationData = (props) => {
    const tableContainerSx = {
        border: "10px solid rgba(128,128,128,0.4)",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        borderRadius: 2,
        maxHeight: 500
      };

    if (!props.assetData.data[0][0]){
        return(
            <div>
                <h1>
                AssetID not Found!
                </h1>
            </div>
        )
    } else {
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
    };
};


export default AssetLocationData