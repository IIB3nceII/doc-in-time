import { FC } from "react";
//import { Footer } from "../../components/common";
import { Contact, Hero, Introduction } from "../../components/ui";
import s from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div className={s.container}>
      <Hero />
      <Introduction />
      <Contact />
      {/*<Footer />*/}
    </div>
  );
};

export default Home;
