import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import K12Return from "../../auth/api/k12return"
import { inputLabelClasses } from "@mui/material/InputLabel";
import { TextField } from '@mui/material';

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
      {/* <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <input type="text" placeholder="Tracking Number" {...register("TrackingNumber", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Description" {...register("SerialNumber", {required: true, maxLength: 80})} />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
      { sendData ? <K12Return formData={sendData} /> : null }
      </div>
     */}


      <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <TextField
                required
                fullWidth
                id="outlined-required"
                label="Tracking Number"
                variant="filled"
                onChange={trackingNumberHandleChange}
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
            label="Serial Number"
            variant="filled"
            onChange={serialNumberHandleChange}
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
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
        { sendData ? <K12Return formData={sendData} /> : null }
      </div>
    </>
  );
}

export default App;