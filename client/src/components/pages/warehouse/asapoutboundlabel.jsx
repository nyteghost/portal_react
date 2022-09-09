import { useState, useRef} from "react";

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {Box} from "@mui/material"


export default function MaterialUIPickers() {
  const [value, setValue] = useState(dayjs('2022-08-18'));
  const [sendData, setData] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
      } else if (i === props){
        setData('');
        let i = props
      }  
  }
  console.log(value)
  console.log(value.$M+1,value.$D,value.$y)
  return (
    <Box sx={{ 
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      margin: 4, 
      border: '1px',
      }}
      >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
    
  );
  
};


