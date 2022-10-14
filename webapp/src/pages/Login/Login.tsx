import React, { useEffect, useState } from "react";
import s from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";

interface ILoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  /* useEffect(() => {
    return () => {
      setValue("email", "");
      setValue("password", "");
    };
  }, []); */

  const onLoginSubmit = (data: any) => console.log(data);

  return (
    <div className={s.container}>
      <img src={Logo} alt="logo" />
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <div className={s.formField}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
          {errors.email?.type === "required" && <p>{errors.email?.message}</p>}
        </div>

        <div className={s.formField}>
          <label>Password</label>
          <input type="password" {...register("password", { required: true })} aria-invalid={errors.password ? "true" : "false"} />
          {errors.password?.type === "required" && <p>{errors.password?.message}</p>}
        </div>
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
