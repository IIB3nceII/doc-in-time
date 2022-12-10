/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { FC } from "react";
import s from "./ContentLoading.module.scss";
import LoadingImage from "../../../assets/images/loading.svg";

interface IContentLoadingProps {
  text?: string;
}

const ContentLoading: FC<IContentLoadingProps> = ({ text }) => {
  return (
    <div className={s.container}>
      <img src={LoadingImage} loading="lazy" alt="Loading image" />
      <p>{text || "Updating content..."}</p>
    </div>
  );
};

export default ContentLoading;
