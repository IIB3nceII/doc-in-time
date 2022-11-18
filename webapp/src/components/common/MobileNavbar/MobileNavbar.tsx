import React, { FC, useEffect } from "react";
import s from "./MobileNavbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { INavBarItem } from "src/models";
import { useTranslation } from "react-i18next";

interface IMobileNavbarProps {
  items: ReadonlyArray<INavBarItem>;
  setCurrentTab: (pathName: string) => void;
}

const MobileNavbar: FC<IMobileNavbarProps> = ({ items, setCurrentTab }) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    setCurrentTab(location.pathname.split("/")[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={`${s.root} dark:bg-slate-900 dark:text-white dark:border-slate-700`}>
      <ul>
        {items?.map(({ path, icon, title_key, isActive }, i) => (
          <li key={i} className={`${isActive ? "border-t-2 border-blue text-blue" : ""}`} onClick={() => setCurrentTab(path)}>
            <Link to={path} className=" flex flex-col justify-center items-center">
              {icon}
              <p>{t(title_key)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
