import React, { FC, ReactNode } from "react";
import MobileNavbar from "../MobileNavbar";
import Navbar from "../Navbar";
import s from "./Layout.module.scss";
import { BrowserRouter } from "react-router-dom";

interface ILayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <div className={s.root}>
        <Navbar />
        <main>{children}</main>
        <MobileNavbar />
      </div>
    </BrowserRouter>
  );
};

export default Layout;
