import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import NewReturn from "../../auth/api/returns"
import Box from '@mui/material/Box'

const  App = () => {
  const [sendData, setData] = useState('');
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
    parentToChild(data);
  };
  
  return (
    <>
     <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3}>
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
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
      <div>
        { sendData ? <NewReturn formData={sendData} /> : null }
      </div>
    
  </>
  );
}

export default App;