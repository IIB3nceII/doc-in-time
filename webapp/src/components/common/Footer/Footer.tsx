import React from "react";
import s from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={s.container}>
      <ul className={s.card}>
        <li>theme</li>
      </ul>

      <span></span>

      <ul>
        <li>
          <Link to="#">placeholder</Link>
        </li>
        <li>
          <Link to="#">placeholder</Link>
        </li>
        <li>
          <Link to="#">placeholder</Link>
        </li>
        <li>
          <Link to="#">placeholder</Link>
        </li>
        <li>
          <Link to="#">placeholder</Link>
        </li>
      </ul>

      <span></span>

      <ul>
        <li>
          <Link to="#">placeholder</Link>
        </li>
        <li>
          <Link to="#">placeholder</Link>
        </li>{" "}
        <li>
          <Link to="#">placeholder</Link>
        </li>{" "}
        <li>
          <Link to="#">placeholder</Link>
        </li>{" "}
        <li>
          <Link to="#">placeholder</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
