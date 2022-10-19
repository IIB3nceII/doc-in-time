import React, { FC, useEffect, useState } from "react";
import s from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";
import { ILoginFormData } from "src/models";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { loginUserWithEmail } from "../../shared/store/actions/auth.action";

interface ILoginProps extends StateProps, DispatchProps {}

const Login: FC<ILoginProps> = ({ loginUserWithEmail }) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const onLoginSubmit = async (data: ILoginFormData) => {
    try {
      await loginUserWithEmail(data);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = { loginUserWithEmail };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
