import "../../../styles/new.css";
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import AssetLocation from "../../auth/api/newassloc"

const  App = () => {
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  };
  
  const onSubmit = data => {
    data = JSON.parse(JSON.stringify(data));
    setCount(count + 1)
    data.submit = count
    parentToChild(data);
  };
  
  return (
    <>
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
          <input type="text" placeholder="Location" {...register("location", {required: true, maxLength: 80})} />
          <input type="text" placeholder="Asset Number" {...register("assetid", {required: true})} />
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