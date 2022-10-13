import React, { FC } from "react";
import { Hero, Introduction } from "../../components/ui";
import s from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div>
      <Hero />
      <Introduction />
    </div>
  );
};

export default Home;
