import { ReactNode } from "react";

export default interface INavBarItem {
  path: string;
  icon: ReactNode;
  title: string;
  isActive: boolean;
}
