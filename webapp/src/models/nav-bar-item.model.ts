import { ReactNode } from "react";

export default interface INavBarItem {
  path: string;
  icon: ReactNode;
  title_key: string;
  isActive: boolean;
  isAuth: boolean;
  isDoc: boolean | undefined;
}
