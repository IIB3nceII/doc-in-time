/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { FC } from "react";
import s from "./Contact.module.scss";
import ContactUsImg from "../../../assets/images/contact_us.svg";
import { useTranslation } from "react-i18next";

const Contact: FC = () => {
  const { t } = useTranslation();

  return (
    <section className={s.container}>
      <div className={s.content}>
        <h2>{t("contact.title")}</h2>
        <span>Tel: <a href="tel:number">+361000000</a></span>
        <span>Email: <a href="mailto:info@docintime.com">info@docintime.com</a></span>
      </div>
      <img src={ContactUsImg} alt="Contact image" />
    </section>
  );
};

export default Contact;
