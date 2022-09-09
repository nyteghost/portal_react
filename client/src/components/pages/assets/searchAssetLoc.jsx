import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState} from "react";
// import {Hello} from "../../tables/getData"
import Box from '@mui/material/Box'
import "../../../styles/warehouse.css";
import GetAssetLocation from "../../auth/api/asset"
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import {useRef} from 'react';


const  SearchAssetLoc = (props) => {
  const assetIDRef = useRef();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const [assetID, setAssetID] = useState('');

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  }
  
  const assetNumberHandleChange = (event) => {
    setAssetID(event.target.value) 
  };

  const onSubmit = data => {
    setCount(count + 1);
    data = JSON.parse(JSON.stringify(data));
    data.submit = count;
    data.assetID = assetIDRef.current.value;
    parentToChild(data);
  }
 
  
  return (
    <>
      {/* <div>
        <Box textAlign='center' sx={{ '& button': { m: 2 } }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ErrorMessage errors={errors} name="singleErrorInput" />
            <input type="text" placeholder="Asset Number/Serial Number" {...register("assetid", {required: true, maxLength: 80})} />
            <Button size="small" type="submit" color="primary" variant="round">
              Submit
            </Button>
          </form>
        </Box>
      </div>
      
      <div>
        { sendAssetID ? <GetAssetLocation data={sendAssetID} /> : null }
      </div> */}
    
    
    
      <Box textAlign='center' sx={{ '& button': { m: 2 } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
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
          <Button size="small" type="submit" color="primary" variant="round">
            Submit
          </Button>
        </form>
      </Box>
      <div>
        { sendData ? <GetAssetLocation formData={sendData} /> : null }
      </div>

    </>
  );
}

export default SearchAssetLoc;