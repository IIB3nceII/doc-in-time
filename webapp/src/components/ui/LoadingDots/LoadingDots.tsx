import React, { FC } from "react";
import s from "./LoadingDots.module.scss";

const LoadingDots: FC = () => {
  return (
    <div className={s.root}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LoadingDots;
