import React, { FC, ReactNode, useEffect, useState } from "react";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";
import s from "./Layout.module.scss";
import { BrowserRouter } from "react-router-dom";
import { HiOutlineHome, HiOutlineUsers, HiOutlineCalendar, HiOutlineIdentification, HiOutlineCog } from "react-icons/hi";
import { INavBarItem } from "src/models";

interface ILayoutProps {
  children: ReactNode | ReactNode[];
}

const navBarItems: INavBarItem[] = [
  {
    path: "/",
    icon: <HiOutlineHome className="h-8 w-8" />,
    title: "Home",
    isActive: false,
  },
  {
    path: "/",
    icon: <HiOutlineUsers className="h-8 w-8" />,
    title: "Home",
    isActive: false,
  },
  {
    path: "calendar",
    icon: <HiOutlineCalendar className="h-8 w-8" />,
    title: "Calendar",
    isActive: false,
  },
  {
    path: "/",
    icon: <HiOutlineIdentification className="h-8 w-8" />,
    title: "Home",
    isActive: false,
  },
  {
    path: "/",
    icon: <HiOutlineCog className="h-8 w-8" />,
    title: "Home",
    isActive: false,
  },
];

const Layout: FC<ILayoutProps> = ({ children }) => {
  const [items, setItems] = useState<INavBarItem[]>(navBarItems);

  const setCurrentTab = (pathName: string): void => {
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
  };

  return (
    <BrowserRouter>
      <div className={s.root}>
        <Navbar items={items} setCurrentTab={setCurrentTab} />
        <main>{children}</main>
        <div className={s.mobileNav}>
          <MobileNavbar items={items} setCurrentTab={setCurrentTab} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
