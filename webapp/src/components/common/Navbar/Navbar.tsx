import React from "react";
import s from "./Navbar.module.scss";
import { HiOutlineUserCircle, HiOutlineBell, HiOutlineSearch } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className={s.root}>
      <HiOutlineUserCircle className="icon" />
      <form className={s.search}>
        <input type="text" placeholder="Search..." />
        <HiOutlineSearch className={s.searchIcon} />
        <button type="submit" hidden />
      </form>
      <HiOutlineBell className="icon" />
    </div>
  );
};

export default Navbar;
