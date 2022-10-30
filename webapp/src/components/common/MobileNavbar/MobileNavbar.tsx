import React, { FC, useEffect } from "react";
import s from "./MobileNavbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { INavBarItem } from "src/models";

interface IMobileNavbarProps {
  items: ReadonlyArray<INavBarItem>;
  setCurrentTab: (pathName: string) => void;
}

const MobileNavbar: FC<IMobileNavbarProps> = ({ items, setCurrentTab }) => {
  const location = useLocation();

  // setCurrentTab(location.pathname.split("/")[1]);

  return (
    <nav className={`${s.root} dark:bg-slate-900 dark:text-white dark:border-slate-700`}>
      <ul>
        {items?.map(({ path, icon, title, isActive }, i) => (
          <li key={i} className={`${isActive ? "border-t-2 border-blue text-blue" : ""}`} onClick={() => setCurrentTab(path)}>
            <Link to={path} className=" flex flex-col justify-center items-center">
              {icon}
              <p>{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
