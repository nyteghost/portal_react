import React, { Component } from 'react' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material"


const AssetLocTable = (props) => { 
    console.log('Beginning of Creation of Table')
    console.log(props)
        return (  
          <TableContainer component={Paper}>  
            <Table stickyHeader  aria-label="sticky table">  
              <TableHead>  
                <TableRow>  
                  <TableCell>Id</TableCell>  
                  <TableCell align="right">Asset ID</TableCell>  
                  <TableCell align="right">Device Location</TableCell>
                  <TableCell align="right">Serial Number</TableCell>
                  <TableCell align="right">Model Number</TableCell>
                  <TableCell align="right">WH Status</TableCell>  
                  <TableCell align="right">Device Location Time</TableCell>  
                  <TableCell style={{paddingRight:"60px"}} align="right" >Department</TableCell>  
                </TableRow>  
              </TableHead> 
              {/* <TableBody>  
                {  
                  this.state.ProductData.map((p, index) => { 
                    return <TableRow key={index}>  
                      <TableCell component="th" scope="row">  
                        {p.Id}  
                      </TableCell>  
                      <TableCell align="right">{p.assetid}</TableCell>  
                      <TableCell align="right">{p.devicelocation}</TableCell>  
                      <TableCell align="right">{p.serialnumber}</TableCell>  
                      <TableCell align="right">{p.model_number}</TableCell>  
                      <TableCell align="right">{p.wh_status}</TableCell>  
                      <TableCell align="right">{p.devicelocationtime}</TableCell>  
                      <TableCell style={{paddingRight:"114px"}} align="right">{p.Department}</TableCell>  
                    </TableRow>  
                  })  
                } 
              </TableBody>  */}
            </Table>  
          </TableContainer>  
        );  
      }    
export default AssetLocTable