import React, { FC } from "react";
import s from "./Contact.module.scss";
import ContactUsImg from "../../../assets/images/contact_us.svg";

const Contact: FC = () => {
  return (
    <section className={s.container}>
      <div className={s.content}>
        <h2>Contact us</h2>
        <span>Tel: +361000000</span>
        <span>Email: info@docintime.com</span>
      </div>
      <img src={ContactUsImg} alt="Contact image" />
    </section>
  );
};

export default Contact;
