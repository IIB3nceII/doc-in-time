import React from "react";
import s from "./Introduction.module.scss";
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineChatAlt2 } from "react-icons/hi";

const Introduction = () => {
  return (
    <section className={s.container}>
      <h2 className={s.mainTitle}>Our Mission</h2>

      <div className={s.gridContainer}>
        <div className={s.card}>
          <HiOutlineClipboardCheck className={s.icon} />
          <h3>All doctors, One site</h3>
          <p className={s.description}>
          Does it also bother you that you can't book with <b>several</b> doctors on the <b>same</b> page? <br/> With <b>Doc in Time</b>, you can book an appointment at <b>any</b> hospital in the country, <b>conveniently</b>, even from your <b>home</b>.
          </p>
        </div>
        <div className={s.card}>
          <HiOutlineClock className={s.icon} />
          <h3>Quick reservations</h3>
          <p className={s.description}>
          Just need a <b>prescription</b>? <br/> <br/> <b>Doc in Time</b> provides you numerous reservation type with each available doctor. <b>Book</b> an appointment with your GP in no time and <b>reduce</b> your <b>queue time</b>.
          </p>
        </div>
        <div className={s.card}>
          <HiOutlineChatAlt2 className={s.icon} />
          <h3>User-friendly design</h3>
          <p className={s.description}>
          Tired of useless, <b>unreadable</b> government <b>sites</b> where you can <b>never</b> find anything? <br/>  <b>Doc in Time </b> is designed to be easy to use by anyone of any age. It only takes a few clicks to make a <b>reservation</b>, which can be easily <b>modified</b> later.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
