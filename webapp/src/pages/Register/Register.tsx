import React, { FC } from "react";
import s from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";
import { IRegisterFormData } from "src/react-app-env";

const Register: FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();

  const onLoginSubmit = (data: IRegisterFormData) => console.log(data);

  return (
    <div className={s.container}>
      <img src={Logo} alt="logo" />
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <div className={s.formField}>
          <label>First Name</label>
          <input type="text" {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"} />
          {errors.firstName?.type === "required" && <p>{errors.firstName?.message}</p>}
        </div>

        <div className={s.formField}>
          <label>Last Name</label>
          <input type="text" {...register("lastName", { required: true })} aria-invalid={errors.lastName ? "true" : "false"} />
          {errors.lastName?.type === "required" && <p>{errors.lastName?.message}</p>}
        </div>

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

export default Register;
