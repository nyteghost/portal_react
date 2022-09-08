import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Etched from "../../auth/api/etched"
import { TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";


const  App = () => {
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
    data.assetid = assetID;
    parentToChild(data);
  };
  
  const assetNumberHandleChange = (event) => {
    setAssetID(event.target.value) 
  };
  
  return (
    <>
      {/* <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <input type="text" placeholder="Asset ID" {...register("assetid", {required: true, maxLength: 100})} />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
      { sendData ? <Etched formData={sendData} /> : null }
      </div> */}
      <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
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