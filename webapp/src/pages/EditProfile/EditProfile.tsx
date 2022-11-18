import React, { FC } from "react";
import { Link } from "react-router-dom";
import s from "./EditProfile.module.scss";

const EditProfile: FC = () => {
  return <div className={s.container}>Waiting for model implementations...
    <div className={s.doctor}>
      <Link to="/doc-register">I am a doctor!</Link>
    </div>
  </div>;
};

export default EditProfile;
