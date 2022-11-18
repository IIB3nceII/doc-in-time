import React, { FC } from "react";
import { Link } from "react-router-dom";
import s from "./DocRegistration.module.scss";

const DocRegistration: FC = () => {
  return <div className={s.container}>Heni dolgozik rajta

<div className={s.dropdown}>
</div>


      <div className={s.cancel}>
      <Link to="/edit-profile">Cancel</Link>
    </div>
  </div>;
};


export default DocRegistration;
