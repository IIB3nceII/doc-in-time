import React, { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { FinderForm } from "src/components/finder";
import s from "./AppointmentFinder.module.scss";

const AppointmentFinder: FC = () => {
  const clinics = useLoaderData();

  return (
    <div className={s.container}>
      <FinderForm clinics={clinics} />
    </div>
  );
};

export default AppointmentFinder;
