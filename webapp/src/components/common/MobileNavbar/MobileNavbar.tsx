import React from "react";
import s from "./MobileNavbar.module.scss";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUsers, HiOutlineCalendar, HiOutlineIdentification, HiOutlineCog } from "react-icons/hi";

const MobileNavbar = () => {
  return (
    <nav className={`${s.root} dark:bg-slate-900 dark:text-white dark:border-slate-700`}>
      <ul>
        <Link to="/">
          <li className={s.active}>
            <HiOutlineHome className={s.icon} />
            <p>item</p>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineUsers className={s.icon} />
            <p>item</p>
          </li>
        </Link>

        <Link to="/calendar">
          <li>
            <HiOutlineCalendar className={s.icon} />
            <p>Calendar</p>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineIdentification className={s.icon} />
            <p>item</p>
          </li>
        </Link>

        <Link to="/">
          <li>
            <HiOutlineCog className={s.icon} />
            <p>item</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
