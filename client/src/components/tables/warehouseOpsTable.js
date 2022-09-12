import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material"
import Box from '@mui/material/Box'
import "../../styles/warehouse.css";



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

    try{
        return (  
            <>  
                {/* <h1>Total Count for Today {String(props.data.data.data[0].length)}.</h1> */}
                <Box sx={{ '& button': { m: 1 } }}>
                    <TableContainer 
                        component={Paper}
                        sx={tableContainerSx}
                    >  
                    { !props.response.data.data[0].length !== 0 ? <h1>Total Count for Today {String(props.response.data.data[0].length)}.</h1> : <h1>Loading</h1> }
                    <Table stickyHeader={true}>  
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
                            props.response.data.data[0].map((p, index) => { 
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
        catch (e) {  }
      }    

export default WarehouseOpsTable



