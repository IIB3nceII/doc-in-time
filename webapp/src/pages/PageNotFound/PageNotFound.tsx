import React from "react";
import s from "./PageNotFound.module.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/page_not_found.svg"

const PageNotFound = () => {
  return (
    <div className={s.root}>
      <img src={Logo} alt="logo" />
      <button>
      <Link to="/">Return to the main page</Link>
      </button>
    </div>
  );
};

export default PageNotFound;
