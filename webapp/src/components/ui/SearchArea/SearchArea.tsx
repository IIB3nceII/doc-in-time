import React from "react";
import s from "./SearchArea.module.scss";
import { HiOutlineSearch } from "react-icons/hi";

const SearchArea = () => {
  return (
    <form className={s.search}>
      <input type="text" placeholder="Search..." />
      <HiOutlineSearch className={s.searchIcon} />
      <button type="submit" hidden />
    </form>
  );
};

export default SearchArea;
