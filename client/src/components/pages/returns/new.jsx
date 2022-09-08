import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import NewReturn from "../../auth/api/returns"
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";


const  App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [assetID, setAssetID] = useState('');
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
    setCount(count + 1);
    data = JSON.parse(JSON.stringify(data));
    data.Location = location;
    data.TrackingNumber = trackingNumber;
    data.AssetNumber = assetID;
    data.SerialNumber = serialNumber;
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



  return (
    <>
     {/* <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div>
            <label name="lateDelivery" className="form-check-label">Late Delivery</label>
            <input name = "lateCheck" type="checkbox" placeholder="Late Delivery" {...register("LateDelivery", {})} />
          </div>
          <input type="text" placeholder="Location" {...register("Location", {required: true, maxLength: 80})} />
          <input type="text" placeholder="Tracking Number" {...register("TrackingNumber", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Asset Number" {...register("AssetNumber", {required: true})} />
          <input type="text" placeholder="Serial Number" {...register("SerialNumber", {required: true, maxLength: 12})} />
          <Button type="submit" color="primary" variant="contained"> Submit </Button>
        </form>
      </Box>
      <div>
        { sendData ? <NewReturn formData={sendData} /> : null }
      </div>
       */}


      <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage errors={errors} name="singleErrorInput" />
        <div>
          <label name="lateDelivery" className="form-check-label">Late Delivery</label>
          <input name = "lateCheck" type="checkbox" placeholder="Late Delivery" {...register("LateDelivery", {})} />
        </div>
        <TextField
              required
              fullWidth
              id="outlined-required"
              label="Location"
              variant="filled"
              onChange={locationHandleChange}
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
              label="Asset Number"
              variant="filled"
              onChange={assetNumberHandleChange}
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
            <Button type="submit" color="primary" variant="contained"> Submit </Button>
        </form>
      </Box>
      <div>
        { sendData ? <NewReturn formData={sendData} /> : null }
      </div>
  </>
  );
}

export default App;