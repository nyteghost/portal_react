import { useState, useRef} from "react";

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {Box} from "@mui/material"
import Button from '@mui/material/Button';
import ProtectedComponent from "../../auth/api/asap"


export default function MaterialUIPickers() {
  const [value, setValue] = useState(dayjs('2022-08-18'));
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const dbValue = localStorage.getItem("database");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = props => {
    let data = {
      company: dbValue,
      date: props
    }
    parentToChild(data);
  }

  const parentToChild = props => {
    console.log(props)
    var i; 
    if (!i){setData(props);
      } else if (i === props){
        setData('');
        let i = props
      }  
  }

  return (
    <>
  <Box sx={{ 
        marginTop: 4, 
        border: '1px',
        textAlign:'center'
        }}
        >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
     
          <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
      </LocalizationProvider>
  </Box>
      <Box  sx={{textAlign: 'center'}}>
        <Button type="submit" color="primary" variant="contained"  
          onClick={() => {
            onSubmit(value.$y+'-'+(value.$M+1)+'-'+value.$D);
            }} > Submit </Button>
      </Box>
      <Box>
        { sendData ? <ProtectedComponent formData={sendData} /> : null }
      </Box>
    
  
    
  
    
   


  
    
      
    
  
  </>
    
  );
  
};


