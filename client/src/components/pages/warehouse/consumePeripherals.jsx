import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProtectedComponent from "../../auth/api/consumedPeriphs"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';
import {BootstrapInput} from "../../../styles/BootStrapInput";
import Stack from '@mui/material/Stack'




export default function CustomizedSelects() {
  const countRef = useRef();

  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [peripheral, setPeriph] = useState('');
  const [note, setNote] = useState('');
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
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
    setCount(count + 1)
    data.submit = count
    data.i = peripheral
    data.q = countRef.current.value;
    data.n = note;
    parentToChild(data);
    setReload(count)
 
  };
  
  
  const peripheralHandleChange = (event) => {
    setPeriph(event.target.value);
  };
  const noteHandleChange = (event) => {
    setNote(event.target.value);
  };



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
                  > Peripheral</InputLabel>
                  <Select
                    labelId="peripheral1-select-label"
                    id="peripheral1-select"
                    value={peripheral}
                    label="peripheral1Selection"
                    onChange={peripheralHandleChange}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value={'3400 Charger (USB-C)'}>3400 Charger (USB-C)</MenuItem>
                    <MenuItem value={'Box - 12x16x6'}>Box - 12x16x6</MenuItem>
                    <MenuItem value={'Box - 18x18x12'}>Box - 18x18x12</MenuItem>
                    <MenuItem value={'Box - 9x9x6'}>Box - 9x9x6</MenuItem>
                    <MenuItem value={'DVD Drive'}>DVD Drive</MenuItem>
                    <MenuItem value={'Dell 3.5mm Charger (Sm Barrel)'}>Dell 3.5mm Charger (Sm Barrel)</MenuItem>
                    <MenuItem value={'Dell 7.4mm Charger (Lg Barrel)'}>Dell 7.4mm Charger (Lg Barrel)</MenuItem>
                    <MenuItem value={'Headset'}>Headset</MenuItem>
                    <MenuItem value={'Lenovo 45w USB-C Charger'}>Lenovo 45w USB-C Charger</MenuItem>
                    <MenuItem value={'Mouse'}>Mouse</MenuItem>
                    <MenuItem value={'Sleeve'}>Sleeve</MenuItem>
                  </Select>
              </FormControl> 
            </Box>
            <Box p={1}>
              <FormControl fullWidth size="small" >
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Count"
                  variant="filled"
                  inputRef={countRef}
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
                > Note</InputLabel>
                <Select
                  labelId="note-select-label"
                  id="note-select"
                  value={note}
                  label="noteSelection"
                  onChange={noteHandleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={'Stock Received'}>Stock Received</MenuItem>
                  <MenuItem value={'Stock Consumed'}>Stock Consumed</MenuItem>
                </Select>
              </FormControl> 
            </Box>
            
            <Box textAlign='center'>
              <Button  disabled={disabled} type="submit" color="primary" variant="contained" >
                Submit
              </Button>
            </Box>
        </form>
        <div>{ sendData ? <ProtectedComponent formData={sendData} /> : null }</div>
      </Box>
    </Stack>
  </>
  
  );
}

