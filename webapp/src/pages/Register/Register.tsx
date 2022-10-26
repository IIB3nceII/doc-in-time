import React, { FC, useEffect } from "react";
import s from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";
import { IRegisterFormData } from "src/models";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { registerUserWithEmail } from "../../shared/store/actions/auth.action";
import LoadingDots from "../../components/ui/LoadingDots/LoadingDots";

interface IRegisterProps extends StateProps, DispatchProps {}

const Register: FC<IRegisterProps> = ({ auth, registerUserWithEmail }) => {
  const navigate = useNavigate();
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();

  useEffect(() => {
    if (auth.account?.uid) {
      navigate("/edit-profile");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const onLoginSubmit = (data: IRegisterFormData): void => registerUserWithEmail(data);

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
        <button type="submit" disabled={auth.loading}>
          Register
          {auth.loading && <LoadingDots />}
        </button>
      </form>
      <div className={s.options}></div>
    </div>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = { registerUserWithEmail };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
