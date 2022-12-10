import { FC, ReactNode, Suspense, useState, useCallback, useEffect } from "react";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";
import s from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import { HiOutlineHome, HiOutlineCalendar, HiOutlineIdentification } from "react-icons/hi";
import { INavBarItem } from "src/models";
import ContentLoading from "../ContentLoading";
import i18n from "src/i18n";

interface ILayoutProps {
  children?: ReactNode | ReactNode[];
}

const navBarItems: INavBarItem[] = [
  {
    path: "/",
    icon: <HiOutlineHome className="h-8 w-8" />,
    title_key: "navbar.home",
    isActive: false,
    isAuth: false,
    isDoc: undefined
  },
  {
    path: "/register",
    icon: null,
    title_key: "navbar.register",
    isActive: false,
    isAuth: false,
    isDoc: undefined
  },
  {
    path: "calendar",
    icon: <HiOutlineCalendar className="h-8 w-8" />,
    title_key: "navbar.calendar",
    isActive: false,
    isAuth: true,
    isDoc: true
  },
  {
    path: "appointment-finder",
    icon: <HiOutlineIdentification className="h-8 w-8" />,
    title_key: "navbar.finder",
    isActive: false,
    isAuth: true,
    isDoc: undefined
  },
  {
    path: "/my-appointments",
    icon: <HiOutlineIdentification className="h-8 w-8" />,
    title_key: "navbar.my_appointments",
    isActive: false,
    isAuth: true,
    isDoc: false
  },
];

const Layout: FC<ILayoutProps> = ({ children }) => {
  const [items, setItems] = useState<INavBarItem[]>(navBarItems);

  useEffect(() => {
    if (i18n.language !== 'hu') {
      i18n.changeLanguage('hu')
      localStorage.setItem('i18nextLng', 'hu')
    }
  }, []);

  const setCurrentTab = useCallback((pathName: string): void => {
    let copy = [...items];
    const idx = copy.findIndex((q) => q.path.toLowerCase() === pathName.toLowerCase());
    if (idx > -1) {
      copy = copy.map((q) => ({ ...q, isActive: false }));
      copy[idx].isActive = true;
      setItems(copy);
      localStorage.currentTab = copy[idx].path;
    } else {
      copy = copy.map((q) => ({ ...q, isActive: false }));
      copy[0].isActive = true;
      setItems(copy);
      localStorage.currentTab = copy[0].path;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<ContentLoading />}>
      <div className={s.root}>
        <Navbar items={items} setCurrentTab={setCurrentTab} />
        <main>
          <Outlet />
        </main>
        <div className={s.mobileNav}>
          <MobileNavbar items={items} setCurrentTab={setCurrentTab} />
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
