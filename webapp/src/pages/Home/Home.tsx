import React, { FC } from "react";
import { Contact, Hero, Introduction } from "../../components/ui";
import s from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div>
      <Hero />
      <Introduction />
      <Contact />
    </div>
  );
};

export default Home;
