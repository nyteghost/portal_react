import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import K12Return from "../../auth/api/k12return"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack'

const  App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  }
  
  const onSubmit = data => {
    setCount(count + 1)
    data.TrackingNumber = trackingNumber;
    data.SerialNumber = serialNumber;
    data.submit = count
    parentToChild(data);
  };
  
  const trackingNumberHandleChange = (event) => {
    setTrackingNumber(event.target.value) 
  };
  const serialNumberHandleChange = (event) => {
    setSerialNumber(event.target.value) 
  };


  
  return (
    <>
      <Stack spacing={2}>
        <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ErrorMessage errors={errors} name="singleErrorInput" />
            <Box p={1}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Tracking Number"
                variant="filled"
                onChange={trackingNumberHandleChange}
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
                label="Serial Number"
                variant="filled"
                onChange={serialNumberHandleChange}
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

            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Stack>
      <div>
        { sendData ? <K12Return formData={sendData} /> : null }
      </div>
    </>
  );
}

export default App;