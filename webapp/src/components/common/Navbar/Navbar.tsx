import React, { FC, useState } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { SearchArea } from "../../ui";

const Navbar: FC = () => {
  /**
   * True if the searchArea showing.
   * @state
   */
  const [isSearchAreaOpen, setIsSearchAreaOpen] = useState<boolean>(true);

  return (
    <>
      <div className={s.root}>
        <div className="icon-container">
          <HiOutlineSearch />
        </div>
        <div className="icon-container">
          <HiOutlineBell />
        </div>
      </div>

      {isSearchAreaOpen && <SearchArea />}
    </>
  );
};

export default Navbar;
