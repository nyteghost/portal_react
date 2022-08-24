import "../../../styles/new.css";
import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';

const  App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage errors={errors} name="singleErrorInput" />
      <div>
        <label name="lateDelivery" className="form-check-label">Late Delivery</label>
        <input name = "lateCheck" type="checkbox" placeholder="Late Delivery" {...register("Late Delivery", {})} />
      </div>
      <input type="text" placeholder="Location" {...register("Location", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Tracking Number" {...register("Tracking Number", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Asset Number" {...register("Asset Number", {required: true})} />
      <input type="text" placeholder="Serial Number" {...register("Serial Number", {required: true, maxLength: 12})} />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default App;