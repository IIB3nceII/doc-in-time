import React from "react";
import s from "./PageNotFound.module.scss";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      PageNotFound <Link to="/">Return to Home Page</Link>;
    </div>
  );
};

export default PageNotFound;
