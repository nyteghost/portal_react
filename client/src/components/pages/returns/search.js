import { useState, useRef} from "react";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Box} from "@mui/material"
import Button from '@mui/material/Button';
import ProtectedComponent from "../../auth/api/asap"


const current = new Date();
const todaysDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

export default function MaterialUIPickers() {
  const [value, setValue] = useState(null);
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const dbValue = localStorage.getItem("database");
  const dateRef = useRef();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = props => {
    setCount(count + 1)
    let data = {
      company: dbValue,
      date: props,
      submit: count
    }
    parentToChild(data);
  }

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
      } else if (i === props){
        setData('');
        let i = props
      }  
  }
  const color = "#c44242";

  return (
    <>
    <Box sx={{ 
          marginTop: 4, 
          border: '1px',
          textAlign:'center'
          }}
          >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      
            <DatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={setValue}
              renderInput={(params) => <TextField {...params} sx={{ backgroundColor: 'white' }} />}
              

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


