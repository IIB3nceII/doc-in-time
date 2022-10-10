import React, { FC, ReactNode } from "react";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";
import s from "./Layout.module.scss";

interface ILayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <Navbar />
      <main>{children}</main>
      <MobileNavbar />
    </div>
  );
};

export default Layout;
