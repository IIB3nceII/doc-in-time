import { FC, ReactNode, Suspense, useState, useCallback } from "react";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";
import s from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import { HiOutlineHome, HiOutlineCalendar, HiOutlineIdentification } from "react-icons/hi";
import { INavBarItem } from "src/models";
import ContentLoading from "../ContentLoading";

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
];

const Layout: FC<ILayoutProps> = ({ children }) => {
  const [items, setItems] = useState<INavBarItem[]>(navBarItems);

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
