/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import s from "./Hero.module.scss";
import HeroImage from "../../../assets/images/hero_image.svg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className={s.container}>
      <h1>
        {t("hero.title")}
        <br />
        <span>{t("hero.time")}</span>
      </h1>
      <img src={HeroImage} alt="hero image" />
    </section>
  );
};

export default Hero;
