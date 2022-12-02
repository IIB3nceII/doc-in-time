import React, { FC } from "react";
import s from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";
import { ILoginFormData } from "src/models";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { loginUserWithEmail } from "../../shared/store/actions/auth.action";
import LoadingDots from "src/components/ui/LoadingDots/LoadingDots";
import { useTranslation } from "react-i18next";

interface ILoginProps extends StateProps, DispatchProps { }

const Login: FC<ILoginProps> = ({ auth, loginUserWithEmail }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <label>{t("login.email")}</label>
          <input type="email" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
          {errors.email?.type === "required" && <p>{errors.email?.message}</p>}
        </div>

        <div className={s.formField}>
          <label>{t("login.password")}</label>
          <input type="password" {...register("password", { required: true })} aria-invalid={errors.password ? "true" : "false"} />
          {errors.password?.type === "required" && <p>{errors.password?.message}</p>}
        </div>
        <button type="submit" disabled={auth.loading}>
          {t("login.login")}{auth.loading && <LoadingDots />}
        </button>
      </form>
      <div className={s.options}>
        <Link to="/register">{t("login.no_acc")}</Link>
        <span className={s.divider}></span>
        <Link to="/register">{t("login.forgot_pass")}</Link>
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
