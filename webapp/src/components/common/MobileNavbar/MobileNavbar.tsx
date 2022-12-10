import { FC, useEffect, useState } from "react";
import s from "./MobileNavbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { INavBarItem } from "src/models";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/utils/firebase/firebase.config";
import { getUserById } from "src/utils/firebase/firestore";

interface IMobileNavbarProps {
  items: ReadonlyArray<INavBarItem>;
  setCurrentTab: (pathName: string) => void;
}

const MobileNavbar: FC<IMobileNavbarProps> = ({ items, setCurrentTab }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [user, setUser] = useState<boolean>(false);
  const [userIsDoc, setUserIsDoc] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTab(location.pathname.split("/")[1]);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(true)
        const userDoc = await getUserById(user.uid)
        if (userDoc) {
          setUserIsDoc(userDoc.isDoc)
        }
      }
    })
  }, [location.pathname, setCurrentTab]);

  useEffect(() => {
    setCurrentTab(location.pathname.split("/")[1]);
  }, [location.pathname, setCurrentTab]);

  return (
    <nav className={`${s.root} dark:bg-slate-900 dark:text-white dark:border-slate-700`}>
      <ul>
        {items?.map(({ path, icon, title_key, isActive, isAuth, isDoc }, i) => {
          if (isAuth && !user) { return null }
          if (isDoc && !userIsDoc) { return null }
          if (icon === null && user) { return null }
          return <li key={i} className={`${isActive ? "border-t-2 border-blue text-blue" : ""}`} onClick={() => setCurrentTab(path)}>
            <Link to={path} className=" flex flex-col justify-center items-center">
              {icon}
              <p style={{ textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t(title_key)}</p>
            </Link>
          </li>
        })}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
