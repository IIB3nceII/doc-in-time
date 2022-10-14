import React, { FC } from "react";
import s from "./FormInput.module.scss";

interface IFormInput {
  label: string;
  placeholder?: string;
  type?: string;
}

const FormInput: FC<IFormInput> = ({ label, placeholder, type = "text" }) => {
  return (
    <div className={s.container}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default FormInput;
