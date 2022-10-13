import React, { FC, useEffect, useState } from "react";
import s from "./DarkModeSwitcher.module.scss";
import { HiOutlineSun } from "react-icons/hi";

const DarkModeSwitcher: FC = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const changeTheme = (newTheme: "system" | "light" | "dark") => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("system");

    switch (newTheme) {
      case "light":
        localStorage.theme = "light";
        document.documentElement.classList.add("light");
        break;
      case "dark":
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
        break;
      default:
        localStorage.theme = "system";
        document.documentElement.classList.add("system");
        break;
    }
  };

  return (
    <div className={s.container}>
      <div className="icon-container" onClick={() => setShowOptions(!showOptions)}>
        <HiOutlineSun />
      </div>
      {showOptions && (
        <ul>
          <li onClick={() => changeTheme("system")}>System</li>
          <li onClick={() => changeTheme("light")}>Light</li>
          <li onClick={() => changeTheme("dark")}>Dark</li>
        </ul>
      )}
    </div>
  );
};

export default DarkModeSwitcher;
