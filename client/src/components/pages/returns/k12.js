import "../../../styles/new.css";
import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

const  App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  
  
  return (
    <Box textAlign='center' sx={{ '& button': { m: 2 } }} paddingTop={3} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage errors={errors} name="singleErrorInput" />
        <input type="text" placeholder="Tracking Number" {...register("Tracking Number", {required: true, maxLength: 100})} />
        <input type="text" placeholder="Description" {...register("Description", {required: true, maxLength: 80})} />
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default App;