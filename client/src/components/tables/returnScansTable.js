import React, { Component } from 'react' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from "@mui/material"


const ReturnScanTable = (props) => { 
    // console.log(props)
    const tableContainerSx = {
        border: "10px solid rgba(128,128,128,0.4)",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        borderRadius: 2,
        maxHeight: 700
    };

    try{
        return (  
            <>  
                {/* <h1>Total Count for Today {String(props.data.data.data[0].length)}.</h1> */}
                <Box sx={{ '& button': { m: 1 } }}>
                    <TableContainer 
                    component={Paper}
                    sx={tableContainerSx}
                    >  
                    <Table  stickyHeader={true}
                    >  
                        <TableHead sx={{ "& .MuiTableCell-stickyHeader": {backgroundColor: "primary.main"} }}>  
                        <TableRow>  
                            <TableCell align="center">Asset Number</TableCell>
                            <TableCell align="center">Location</TableCell> 
                            <TableCell align="center">Scan Time</TableCell>
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
                            props.apiData.data.returnScans[0].map((p, index) => { 
                                return <TableRow 
                                    key={index}
                                >  
                                <TableCell align="right">{p.assetid}</TableCell>  
                                <TableCell align="right">{p.shelfid}</TableCell>  
                                <TableCell align="right">{p.placetime}</TableCell>   
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
        catch (e) {  }
      }    
export default ReturnScanTable