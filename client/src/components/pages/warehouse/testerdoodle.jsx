import { useForm } from 'react-hook-form';
import { useState, Suspense, useEffect} from "react";
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
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import ProtectedComponent from "../../auth/api/warehouseops"

import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: "white",
    border: '2px solid #5e77a2',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));


export default function CustomizedSelects() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [operation, setOps] = useState('');
  const [inventory, setInventory] = useState('');
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState('');
  const [assetID, setAssetID] = useState('');
  const [depotReason, setDepotReason] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [reload,setReload] = useState(0);
 

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  }

  
  const onSubmit = data => {
    data = JSON.parse(JSON.stringify(data));
    data.operationtype = operation
    data.assignedcontact = inventory
    data.assetid = assetID;
    data.physicallocation = location;
    data.depotreas = depotReason;
    setCount(count + 1)
    data.submit = count
    parentToChild(data);
    setReload(count)
 
  };
  
  
  const operationsHandleChange = (event) => {
    setOps(event.target.value);
  };
  const inventoryHandleChange = (event) => {
    setInventory(event.target.value);
  };

  const locationHandleChange = (event) => {
    setLocation(event.target.value) 
  };
  const assetIDHandleChange = (event) => {
    setAssetID(event.target.value)
  };
  const depotReasonHandleChange = (event) => {
    setDepotReason(event.target.value)
  };

  
  
  useEffect(() => {
    if(disabled === true){  
      setDisabled(false)
    }
    console.log(sendData)
  },[count]);



  return (
    <>
    <Box sx={{ 
      margin: 4, 
      border: '1px'
      }}
      
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        
          <FormControl fullWidth size="small">
            <InputLabel id="simple-select-label"
            sx={{
              [`&.${inputLabelClasses.shrink}`]: {
                // set the color of the label when shrinked (usually when the TextField is focused)
                color: "orange",
                marginTop:2
              }
            }}
            >Operation</InputLabel>
            <Select
              labelId="operation-select-label"
              id="operation-select"
              value={operation}
              label="OperationSelection"
              onChange={operationsHandleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={'Daily Processing'}>Daily Processing</MenuItem>
              <MenuItem value={'Inventory'}>Inventory</MenuItem>
              
            </Select>
          </FormControl>
    
          <FormControl fullWidth size="small">
            <InputLabel id="simple-select-label"
            sx={{
              [`&.${inputLabelClasses.shrink}`]: {
                // set the color of the label when shrinked (usually when the TextField is focused)
                color: "orange",
                marginTop:2
              }
            }}
            >Status</InputLabel>
            <Select
              labelId="Inventory-selection-label"
              id="Inventory-selection"
              value={inventory}
              label="InventorySelection"
              onChange={inventoryHandleChange}
              input={<BootstrapInput />}
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

          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Location"
            variant="filled"
            onChange={locationHandleChange}
            InputLabelProps={{
                sx: {
                  // set the color of the label when not shrinked
                  color: "",
                  [`&.${inputLabelClasses.shrink}`]: {
                    // set the color of the label when shrinked (usually when the TextField is focused)
                    color: "orange",
                    marginTop: -.9
                  }
                }
            }}      
          />
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Asset Number"
            variant="filled"
            onChange={assetIDHandleChange}
            InputLabelProps={{
                sx: {
                  // set the color of the label when not shrinked
                  color: "",
                  [`&.${inputLabelClasses.shrink}`]: {
                    // set the color of the label when shrinked (usually when the TextField is focused)
                    color: "orange",
                    marginTop: -.9
                  }
                }
            }}
          />
{/* 
          <input type="text" placeholder="Location" {...register("physicallocation", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Asset Number" {...register("assetid", {required: true, maxLength: 100})} /> */}
          { inventory === 'Depot Repair' ?
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Depot Reason"
                variant="filled"
                onChange={depotReasonHandleChange}
                InputLabelProps={{
                  sx: {
                    // set the color of the label when not shrinked
                    color: "",
                    [`&.${inputLabelClasses.shrink}`]: {
                      // set the color of the label when shrinked (usually when the TextField is focused)
                      color: "orange",
                      marginTop: -.9
                    }
                  }
                }}
              /> : null }
        
          <Box textAlign='center'>
            <Button  disabled={disabled} type="submit" color="primary" variant="contained" >
              Submit
            </Button>
          </Box>
      </form>
      <div>{ sendData ? <ProtectedComponent formData={sendData} /> : null }</div>
      
    </Box>

  </>
  
  );
}

