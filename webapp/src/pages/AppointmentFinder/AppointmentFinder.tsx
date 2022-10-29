import React, { FC } from "react";
import { FinderForm } from "src/components/finder";
import s from "./AppointmentFinder.module.scss";

const AppointmentFinder: FC = () => {
  return (
    <div className={s.container}>
      <FinderForm />
    </div>
  );
};

export default AppointmentFinder;
