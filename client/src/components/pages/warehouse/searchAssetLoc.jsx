import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "../../../styles/new.css";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input {...register("firstName")} />

      <input type="submit" />
    </form>
  );
}