import React from "react";
import s from "./Hero.module.scss";
import HeroImage from "../../../assets/images/hero_image.svg";

const Hero = () => {
  return (
    <section className={s.container}>
      <h1>
        Doc just in
        <br />
        <span>Time</span>
      </h1>
      <img src={HeroImage} alt="hero image" />
    </section>
  );
};

export default Hero;
