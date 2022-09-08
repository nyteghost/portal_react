import { useForm } from 'react-hook-form';
import { useState} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../../styles/warehouse.css";
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import ProtectedComponent from "../../auth/api/miscassignment"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';
import {useRef} from 'react';




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
      <TextField
      required
      fullWidth
      id="outlined-required"
      label="Driver"
      variant="filled"
      inputRef={driverRef}
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
    );
  };

  return (
    <>
    {/* <Box sx={{ 
      margin: 4, 
      border: '1px'
      }}
      
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size="small">
        <InputLabel 
          
          sx={{
            [`&.${inputLabelClasses.shrink}`]: {
              // set the color of the label when shrinked (usually when the TextField is focused)
              color: "orange",
              marginTop:2
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
          <input type="text" placeholder="Contact" {...register("contact", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Tracking/Reason" {...register("tracking", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Asset" {...register("assetid", {required: true, maxLength: 100})} />
        < ShowDriver />
        <Box textAlign='center'>
        <Button type="submit" color="primary" variant="contained" >
            Submit
        </Button>
        </Box>
      </form>
    </Box>
    <div>
      { sendData ? <ProtectedComponent formData={sendData} /> : null }
    </div> */}
  
    <Box sx={{ 
      margin: 4, 
      border: '1px'
      }}
      
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size="small">
        <InputLabel 
          
          sx={{
            [`&.${inputLabelClasses.shrink}`]: {
              // set the color of the label when shrinked (usually when the TextField is focused)
              color: "orange",
              marginTop:2
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
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Contact"
          variant="filled"
          inputRef={contactRef}
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
          label="Tracking/Reason"
          variant="filled"
          inputRef={trackingRef}
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
          label="Asset"
          variant="filled"
          inputRef={assetIDRef}
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
        </FormControl>
        < ShowDriver />  
        <Box textAlign='center'>
          <Button type="submit" color="primary" variant="contained" >
                Submit
          </Button>
        </Box>
      </form>
    </Box>
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