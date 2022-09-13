import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../../styles/warehouse.css";
import ProtectedComponent from "../../auth/api/warehouseops"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';
import {BootstrapInput} from "../../../styles/BootStrapInput";
import Stack from '@mui/material/Stack'
import ProtectedComponentTable from "../../auth/api/opsTableAPI"


function Stupidthing() {


  const locationRef = useRef('');
  const assetIDRef = useRef('');
  const depotReasonRef = useRef('');

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [operation, setOps] = useState('');
  const [inventory, setInventory] = useState('');
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  // const [location, setLocation] = useState('');
  // const [assetID, setAssetID] = useState('');
  // const [depotReason, setDepotReason] = useState('');
  const [disabled, setDisabled] = useState(false);
 

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
    data.assetid = assetIDRef.current.value
    data.physicallocation = locationRef.current.value;
    data.depotreas = depotReasonRef.current.value;
    setCount(count + 1)
    data.submit = count
    parentToChild(data);
 
  };
  
  
  const operationsHandleChange = (event) => {
    setOps(event.target.value);
  };
  const inventoryHandleChange = (event) => {
    setInventory(event.target.value);
  };

  // const locationHandleChange = (event) => {
  //   setLocation(event.target.value) 
  // };
  // const assetIDHandleChange = (event) => {
  //   setAssetID(event.target.value)
  // };
  // const depotReasonHandleChange = (event) => {
  //   setDepotReason(event.target.value)
  // };

  // reload = () => {
  //   //RELOAD COMPONENT
  //   this.componentDidMount();
  // };
  
  useEffect(() => {
    if(disabled === true){  
      setDisabled(false)
    }
    console.log(sendData)
  },[count]);

  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ 
          margin: 4, 
          border: '1px'
          }}
          
          >
          <form onSubmit={handleSubmit(onSubmit)}>
              <Box p={1}>
                <FormControl fullWidth size="small">
                  <InputLabel id="simple-select-label"
                    sx={{
                      marginTop:.8,
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "orange",
                        marginTop:-.8,
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
              </Box>

              <Box p={1}>
                <FormControl fullWidth size="small">
                  <InputLabel id="simple-select-label"
                    sx={{
                      marginTop:.8,
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "orange",
                        marginTop:-.8,
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
              </Box>

              <Box p={1}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Location"
                  variant="filled"
                  inputRef={locationRef}
                  inputProps={{
                    style:{
                      padding: '10px 15px',
                    }
                  }}
                  InputLabelProps={{
                    sx: { marginTop: -.8,
                      // set the color of the label when not shrinked
                      color: "",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "orange",
                        marginTop: -3
                        }
                      }
                  }}      
                />
              </Box>

              <Box p={1}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Asset Number"
                  variant="filled"
                  inputRef={assetIDRef}
                  inputProps={{
                    style:{
                      padding: '10px 15px',
                    }
                  }}
                  InputLabelProps={{
                    sx: { marginTop: -.8,
                      // set the color of the label when not shrinked
                      color: "",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "orange",
                        marginTop: -3
                        }
                      }
                  }}
                />
              </Box>

              <Box p={1}>
                { inventory === 'Depot Repair' ?
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Depot Reason"
                  variant="filled"
                  inputRef={depotReasonRef}
                  inputProps={{
                    style:{
                      padding: '10px 15px',
                    }
                  }}
                  InputLabelProps={{
                    sx: { marginTop: -.8,
                      // set the color of the label when not shrinked
                      color: "",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "orange",
                        marginTop: -3
                      }
                    }
                  }}
                /> : null }
              </Box>
            
              <Box textAlign='center'>
                <Button  disabled={disabled} type="submit" color="primary" variant="contained" >
                  Submit
                </Button>
              </Box>
          </form>
          <div>{ sendData ? <ProtectedComponent formData={sendData} /> : null }</div>
        </Box>
        <Box p={1}>
          <ProtectedComponentTable count={count}/>
        </Box>
      </Stack>
    </>
  );
}

export default Stupidthing;