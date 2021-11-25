import React from "react";
import style from "./Input.module.css";

const Input = React.forwardRef(function (props, ref) {
  return (
    <div className={style.input}>
      <label htmlFor={props.inputAttributes.id}>{props.label}</label>
      <input {...props.inputAttributes} ref={ref} />
    </div>
  );
});
export default Input;
