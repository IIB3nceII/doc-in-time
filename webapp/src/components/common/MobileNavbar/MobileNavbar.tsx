import React from "react";
import s from "./MobileNavbar.module.scss";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUsers, HiOutlineCalendar, HiOutlineIdentification, HiOutlineViewBoards } from "react-icons/hi";

const MobileNavbar = () => {
  return (
    <nav className={s.root}>
      <ul>
        <Link to="/">
          <li className={s.active}>
            <HiOutlineHome className={s.icon} />
            <span>item</span>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineUsers className={s.icon} />
            <span>item</span>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineCalendar className={s.icon} />
            <span>item</span>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineIdentification className={s.icon} />
            <span>item</span>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineViewBoards className={s.icon} />
            <span>item</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
