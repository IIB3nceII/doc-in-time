import React, { FC, useEffect } from "react";
import s from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo.png";
import { IRegisterFormData } from "src/models";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { registerUserWithEmail, registerUserWithTajNumber } from "../../shared/store/actions/auth.action";
import LoadingDots from "../../components/ui/LoadingDots/LoadingDots";
import { useTranslation } from "react-i18next";
import IRegisterTajFormData from "src/models/register-taj-form-data.model";

interface IRegisterProps extends StateProps, DispatchProps { }

const Register: FC<IRegisterProps> = ({ auth, registerUserWithEmail, registerUserWithTajNumber }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();
  const tajRegister = useForm<IRegisterTajFormData>();

  useEffect(() => {
    if (auth.account?.uid) {
      navigate("/edit-profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const onLoginSubmit = (data: IRegisterFormData): void => registerUserWithEmail(data);
  const onTajLoginSubmit = (data: IRegisterTajFormData): void => registerUserWithTajNumber(data);

  return (
    <div className={s.container}>
      <img src={Logo} alt="logo" />
      <form onSubmit={tajRegister.handleSubmit(onTajLoginSubmit)}>
        <div className={s.formField}>
          <label>{t("register.taj_number")}</label>
          <input type="number" min={'100000000'} max={'999999999'} placeholder={'123456789'} {...tajRegister.register("taj_number", { required: true })} aria-invalid={tajRegister.formState.errors.taj_number ? "true" : "false"} />
          {tajRegister.formState.errors.taj_number?.type === "required" && <p>{tajRegister.formState.errors.taj_number?.message}</p>}
        </div>
        <button type="submit" disabled={auth.loading}>
          {t("register.register")}
          {auth.loading && <LoadingDots />}
        </button>
      </form>
      <div style={{ display: 'flex', width: '24rem', gap: 16, alignItems: 'center' }}><hr style={{ width: '100%' }} />OR<hr style={{ width: '100%' }} /></div>
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <div className={s.formField}>
          <label>{t("register.first_name")}</label>
          <input type="text" placeholder={'John'} {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"} />
          {errors.firstName?.type === "required" && <p>{errors.firstName?.message}</p>}
        </div>

        <div className={s.formField}>
          <label>{t("register.last_name")}</label>
          <input type="text" placeholder={'Doe'} {...register("lastName", { required: true })} aria-invalid={errors.lastName ? "true" : "false"} />
          {errors.lastName?.type === "required" && <p>{errors.lastName?.message}</p>}
        </div>

        <div className={s.formField}>
          <label>{t("register.email")}</label>
          <input type="email" placeholder={'johndoe@blank.com'} {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
          {errors.email?.type === "required" && <p>{errors.email?.message}</p>}
        </div>

        <div className={s.formField}>
          <label>{t("register.password")}</label>
          <input type="password" placeholder={'**********'} {...register("password", { required: true })} aria-invalid={errors.password ? "true" : "false"} />
          {errors.password?.type === "required" && <p>{errors.password?.message}</p>}
        </div>
        <button type="submit" disabled={auth.loading}>
          {t("register.register")}
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

const mapDispatchToProps = { registerUserWithEmail, registerUserWithTajNumber };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
