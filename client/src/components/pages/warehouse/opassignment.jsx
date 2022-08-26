import React from 'react';
import { useForm } from 'react-hook-form';
import { useState} from "react";
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../../../styles/warehouse.css";
import { borderRadius } from '@mui/system';





const  App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [operation, setOps] = React.useState('');
  const [inventory, setAge] = React.useState('');
  
  const onSubmit = data => {
    console.log(data);
  };
  
  const operationsHandleChange = (event) => {
    setOps(event.target.value);
  };
  const inventoryHandleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ 
      minWidth: 120,
      margin: 4, 
      border: '1px'
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ 
          margin: 2, 
          border: '1px'
          }}> 
          <FormControl fullWidth size="small">
            <InputLabel id="simple-select-label">Operation</InputLabel>
            <Select
              labelId="operation-select-label"
              id="operation-select"
              value={operation}
              label="OperationSelection"
              onChange={operationsHandleChange}
              sx={{ backgroundColor:'white' , borderRadius:3 }}
              size="small"
            >
              <MenuItem value={'Daily Processing'}>Daily Processing</MenuItem>
              <MenuItem value={'Inventory'}>Inventory</MenuItem>
              
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ 
          margin: 2, 
          border: '1px',
          }}> 
          <FormControl fullWidth size="small">
            <InputLabel id="simple-select-label">Status</InputLabel>
            <Select
              labelId="Inventory-selection-label"
              id="Inventory-selection"
              value={inventory}
              label="InventorySelection"
              onChange={inventoryHandleChange}
              sx={{ backgroundColor:'white' , borderRadius:3, align:'center'}}
              size="small"
            >
              <MenuItem value={"Ready for Packaging"}>Ready for Packaging</MenuItem>
              <MenuItem value={"Initial Filter"}>Initial Filter</MenuItem>
              <MenuItem value={"Depot Repair"}>Depot Repair</MenuItem>
              <MenuItem value={"ADP Hold"}>ADP Hold</MenuItem>
              <MenuItem value={"Post Repair"}>Post Repair</MenuItem>
              <MenuItem value={"Packaged For Shipping"}>Packaged For Shipping</MenuItem>
              <MenuItem value={"Sent to Dell For Repair"}>Sent to Dell For Repair</MenuItem>
              <MenuItem value={"Warranty Replaced"}>Warranty Replaced</MenuItem>
              <MenuItem value={"Out of Circulation"}>Out of Circulation</MenuItem>
              <MenuItem value={"Returned Equipment"}>Returned Equipment</MenuItem>
              <MenuItem value={"Warehouse Storage Unit"}>Warehouse Storage Unit</MenuItem>
              <MenuItem value={"In Transit"}>In Transit</MenuItem>
              <MenuItem value={"Recycled Non-Repairable"}>Recycled Non-Repairable</MenuItem>
              <MenuItem value={"Printer Reconditioning in Proc"}>Printer Reconditioning in Proc</MenuItem>
              <MenuItem value={"Awaiting Etching"}>Awaiting Etching</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
            <input type="text" placeholder="Location" {...register("Location", {required: true, maxLength: 100})} />
            <input type="text" placeholder="Asset Number" {...register("AssetNumber", {required: true, maxLength: 100})} />
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
      </form>
    </Box>
   
  );
}

export default App;