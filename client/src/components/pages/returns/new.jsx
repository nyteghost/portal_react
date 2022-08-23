import "../../../styles/new.css";
import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="lateDelivery" className="form-check-label">Late Delivery</label>
        <input name = "lateCheck" type="checkbox" placeholder="Late Delivery" {...register("Late Delivery", {})} />
      </div>
      <input type="text" placeholder="Location" {...register("Location", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Tracking Number" {...register("Tracking Number", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Asset Number" {...register("Asset Number", {required: true})} />
      <input type="text" placeholder="Serial Number" {...register("Serial Number", {required: true, maxLength: 12})} />

      <input type="submit" />
    </form>
  );
}