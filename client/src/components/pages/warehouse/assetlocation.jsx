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



const  App = () => {
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
  };
  
  return (
    <>
     {/* <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div>
            <label name="PartsOrdered" className="form-check-label">Parts Ordered</label>
            <input name = "lateCheck" type="checkbox" placeholder="Parts Ordered" {...register("ptsorded", {})} />
            <br/>
            <label name="PartsInstallation" className="form-check-label">Parts Installation</label>
            <input name = "lateCheck" type="checkbox" placeholder="Parts Installation" {...register("ptsinst", {})} />
          </div>
          <input type="text" placeholder="Location" {...register("location", {required: true, maxLength: 80})} />
          <input type="text" placeholder="Asset Number" {...register("assetid", {required: true})} />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
        { sendData ? <AssetLocation formData={sendData} /> : null }
      </div> */}
      <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div>
            <label name="PartsOrdered" className="form-check-label">Parts Ordered</label>
            <input name = "lateCheck" type="checkbox" placeholder="Parts Ordered" {...register("ptsorded", {})} />
            <br/>
            <label name="PartsInstallation" className="form-check-label">Parts Installation</label>
            <input name = "lateCheck" type="checkbox" placeholder="Parts Installation" {...register("ptsinst", {})} />
          </div>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Location"
            variant="filled"
            inputRef={locationRef}
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
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
        { sendData ? <AssetLocation formData={sendData} /> : null }
      </div>
  </>
  );
}

export default App;