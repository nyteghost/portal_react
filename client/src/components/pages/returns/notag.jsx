import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import NewReturn from "../../auth/api/returns"
import Box from '@mui/material/Box'
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import Stack from '@mui/material/Stack'

const  App = () => {
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [assetID, setAssetID] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceType, setDeviceType] = useState('');

  const parentToChild = props => {
    var i;
    
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  
  const onSubmit = data => {
    setCount(count + 1);
    data = JSON.parse(JSON.stringify(data));
    data.Location = location;
    data.TrackingNumber = trackingNumber;
    data.AssetNumber = assetID;
    data.SerialNumber = serialNumber;
    data.DevType = deviceType;
    data.submit = count;
    parentToChild(data);
  };
  
  const locationHandleChange = (event) => {
    setLocation(event.target.value) 
  };
  const trackingNumberHandleChange = (event) => {
    setTrackingNumber(event.target.value) 
  };
  const assetNumberHandleChange = (event) => {
    setAssetID(event.target.value) 
  };
  const serialNumberHandleChange = (event) => {
    setSerialNumber(event.target.value) 
  };
  const deviceTypeHandleChange = (event) => {
    setDeviceType(event.target.value) 
  };

  
  return (
    <>
      <Stack spacing={2}>

        <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div>
            <label name="lateDelivery" className="form-check-label">Late Delivery</label>
            <input name = "lateCheck" type="checkbox" placeholder="Late Delivery" {...register("LateDelivery", {})} />
          </div>
          <Box p={1}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Location"
              variant="filled"
              onChange={locationHandleChange}
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
              label="Asset Number"
              variant="filled"
              onChange={assetNumberHandleChange}
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
          <Box p={1}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Device Type"
              variant="filled"
              onChange={deviceTypeHandleChange}
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
              <Button type="submit" color="primary" variant="contained">Submit</Button>
          </form>
        </Box>
      </Stack>
      <div>
        { sendData ? <NewReturn formData={sendData} /> : null }
      </div>


    </>
  );
}

export default App;