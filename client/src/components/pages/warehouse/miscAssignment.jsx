import { useForm } from 'react-hook-form';
import { useState, useRef} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../../styles/warehouse.css";
import ProtectedComponent from "../../auth/api/miscassignment"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';
import {BootstrapInput} from "../../../styles/BootStrapInput";
import Stack from '@mui/material/Stack'



export default function CustomizedSelects() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const contactRef = useRef();
  const trackingRef = useRef();
  const assetIDRef = useRef();
  const driverRef = useRef();

  const [type, setType] = useState('');
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  // const [contact, setContact] = useState('');
  // const [tracking, setTracking] = useState('');
  // const [assetID, setAssetID] = useState('');
  // const [driver, SetDrive] = useState('');


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
    data.type = type
    data.contact = contactRef.current.value;
    data.tracking = trackingRef.current.value;
    data.assetid = assetIDRef.current.value;
    data.driver = driverRef.current.value;
  
    // data.driver = driver;
    setCount(count + 1)
    data.submit = count
    parentToChild(data);
    console.log(data)
  };
  


  
  const typeHandleChange = (event) => {
    setType(event.target.value);
  };
  // const contactHandleChange = (event) => {
  //   setContact(event.target.value); 
  // };
  // const trackingHandleChange = (event) => {
  //   setTracking(event.target.value); 
  // } ;
  // const assetIDHandleChange = (event) => {
  //   setAssetID(event.target.value); 
  // } ;
  // const driverHandleChange = (event) => {
  //   SetDrive(event.target.value); 
  // } ;


  const ShowDriver = () => {
    if (type !== 'asapPickup') return null;
    return (
      <Box p={1}>
        <FormControl fullWidth size="small" >
          <TextField
          required
          fullWidth
          id="outlined-required"
          label="Driver"
          variant="filled"
          inputRef={driverRef}
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
    );
  };

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
                <InputLabel 
                  sx={{
                    marginTop:.8,
                    [`&.${inputLabelClasses.shrink}`]: {
                      // set the color of the label when shrinked (usually when the TextField is focused)
                      color: "orange",
                      marginTop:-.8,
                    }
                  }}
                  
                id="simple-select-label">Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label="typeSelection"
                    onChange={typeHandleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={'miscAssign'}>Misc Assignment</MenuItem>
                    <MenuItem value={'asapPickup'}>ASAP Pickup</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box p={1}>
              <FormControl fullWidth size="small" >
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Contact"
                  variant="filled"
                  inputRef={contactRef}
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
              <FormControl fullWidth size="small" >
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Tracking/Reason"
                  variant="filled"
                  inputRef={trackingRef}
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
              <FormControl fullWidth size="small" >
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Asset"
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
              </FormControl>
            </Box>
            
            < ShowDriver /> 
            
            <Box textAlign='center'>
              <Button type="submit" color="primary" variant="contained" >
                    Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Stack>
    <div>
      { sendData ? <ProtectedComponent formData={sendData} /> : null }
    </div>
  </>
  );
};

// MuiInputLabel: {
//   styleOverrides: {
//     root: {
//       fontSize: '0.95rem',
//     },
//     shrink: {
//       transform: 'translate(14px, -8px) scale(1) !important',
//     },
//     outlined: {
//       transform: 'translate(14px, 16px) scale(1)',
//     },
//   },
// },