import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import { useState} from "react";

import { loginRequest, protectedResources } from "../../auth/authConfig";

import {Hello, GetData} from "../../tables/getData"


const Child = (props) =>{
  return(
    <div>
      the data passed down is {props.parentToChild}
    </div>
  )
}


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
    parentToChild(data.assetid);
    setCount(count + 1)
    console.info('Counter:' + count)
  }
 
  
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <input type="text" placeholder="Asset Number/Serial Number" {...register("assetid", {required: true, maxLength: 80})} />
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </form>
      </div>
      
      <div>
        { sendAssetID ? <Hello parentToChild={sendAssetID} /> : null }
      </div>
    </>
  );
}

export default SearchAssetLoc;