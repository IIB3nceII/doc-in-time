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
          <h3>Title</h3>
          <p className={s.description}>
            Liquorice gummi bears lemon drops shortbread bear claw dessert sesame snaps oat cake pastry. Pudding wafer tart pie cake ice cream danish.
          </p>
        </div>
        <div className={s.card}>
          <HiOutlineClock className={s.icon} />
          <h3>Title</h3>
          <p className={s.description}>
            Liquorice gummi bears lemon drops shortbread bear claw dessert sesame snaps oat cake pastry. Pudding wafer tart pie cake ice cream danish.
          </p>
        </div>
        <div className={s.card}>
          <HiOutlineChatAlt2 className={s.icon} />
          <h3>Title</h3>
          <p className={s.description}>
            Liquorice gummi bears lemon drops shortbread bear claw dessert sesame snaps oat cake pastry. Pudding wafer tart pie cake ice cream danish.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
