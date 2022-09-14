import React from "react";
import "./LoadingSpinner.css";
import PacmanLoader from "react-spinners/PacmanLoader";


export default function LoadingSpinner() {
  return (
    <div align="center">
    <PacmanLoader color="#36d7b7" />
    </div>
  );
}