import React from "react";
import { FormInput } from "../../components/ui";
import s from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";

interface ILoginFormData {
  firstName: string;
  lastName: string;
}

const Login = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const onLoginSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className={s.container}>
        <img src={Logo} alt="logo" />
        <form onSubmit={onLoginSubmit}>
          <FormInput label="firstName" placeholder="placeholder..." />
          <FormInput label="firstName" placeholder="placeholder..." />
          <button type="submit">Log in</button>
        </form>
        <div className={s.options}>
          <Link to="/register">Do not have an account yet?</Link>
          <span className={s.divider}></span>
          <Link to="/register">Forgot your password?</Link>
        </div>
    </div>
  );
};

export default Login;
