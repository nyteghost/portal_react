import "../../../styles/new.css";
import { useState, useRef} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Etched from "../../auth/api/etched"
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";


const  App = () => {
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
  
  const onSubmit = data => {
    setCount(count + 1);
    data.submit = count;
    data.assetid = assetIDRef.current.value;
    parentToChild(data);
  };
  
  const assetNumberHandleChange = (event) => {
    setAssetID(event.target.value) 
  };
  
  return (
    <>
      <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
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
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
            </form>
          </Box> 
          <div>
            { sendData ? <Etched formData={sendData} /> : null }
          </div>
    
    </>
  );
}

export default App;