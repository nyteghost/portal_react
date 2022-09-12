import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import AssetLocation from "../../auth/api/newassloc"
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import {useRef} from 'react';
import Stack from '@mui/material/Stack'



const  App = () => {
  const formRef = useRef();

  const assetIDRef = useRef();
  const locationRef = useRef();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState('');
  const [assetID, setAssetID] = useState('');


  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  };
  
  // const locationHandleChange = (event) => {
  //   setLocation(event.target.value) 
  // };
  // const assetNumberHandleChange = (event) => {
  //   setAssetID(event.target.value) 
  // };

  const onSubmit = data => {
    data = JSON.parse(JSON.stringify(data));
    setCount(count + 1)
    data.submit = count
    data.location = locationRef.current.value;
    data.assetid = assetIDRef.current.value;
    parentToChild(data);
    formRef.current.reset(); 
    locationRef.current.focus();
  };
  
  return (
    <>
    <Stack spacing={2}>
      <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Box p={1}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div>
            <label name="PartsOrdered" className="form-check-label">Parts Ordered</label>
            <input name = "lateCheck" type="checkbox" placeholder="Parts Ordered" {...register("ptsorded", {})} />
            <br/>
            <label name="PartsInstallation" className="form-check-label">Parts Installation</label>
            <input name = "lateCheck" type="checkbox" placeholder="Parts Installation" {...register("ptsinst", {})} />
          </div>
        </Box>
        <Box p={1}>
          <TextField
            required
            fullWidth
            autoFocus 
            id="outlined-required"
            label="Location"
            variant="filled"
            inputRef={locationRef}
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
        </Box>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
        { sendData ? <AssetLocation formData={sendData} /> : null }
      </div>
    </Stack>
  </>
  );
}

export default App;