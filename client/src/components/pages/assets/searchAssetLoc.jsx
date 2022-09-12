import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState, useRef} from "react";
import Box from '@mui/material/Box'
import "../../../styles/warehouse.css";
import GetAssetLocation from "../../auth/api/asset"
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import LoadingSpinner from "../../../features/spinner/LoadingSpinner"

const  SearchAssetLoc = (props) => {
  const assetIDRef = useRef();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setCount(count + 1);
    data = JSON.parse(JSON.stringify(data));
    data.submit = count;
    data.assetID = assetIDRef.current.value;
    parentToChild(data);
    setIsLoading(false)
  }
 
  
  return (
    <>
    <Box sx={{ 
        margin: 4, 
        border: '1px'
        }}
        >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
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
          <Box textAlign='center'>
            <Button size="small" type="submit" color="primary" variant="round" disabled={isLoading}>
              Submit
            </Button>
          </Box>
        </form>
        <div>
        { sendData ? <GetAssetLocation formData={sendData} /> : null }
      </div>
      </Box>


    </>
  );
}

export default SearchAssetLoc;