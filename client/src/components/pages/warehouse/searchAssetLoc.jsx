import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState} from "react";
// import {Hello} from "../../tables/getData"
import Box from '@mui/material/Box'
import "../../../styles/warehouse.css";
import GetAssetLocation from "../../auth/api/asset"


const  SearchAssetLoc = (props) => {
  const [sendAssetID, setData] = useState('');
  const [count, setCount] = useState(0);
  
  const parentToChild = props => {
    var i;
    
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  }

  // 👇️ reset to initial state
  const resetState = () => {
    setData('');
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    data = JSON.parse(JSON.stringify(data));
    
    setCount(count + 1)
    data.submit = count
    parentToChild(data);
    console.info('Counter:' + count)
  }
 
  
  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default SearchAssetLoc;