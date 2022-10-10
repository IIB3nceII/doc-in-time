import React, { useEffect, useState } from "react";
import s from "./DarkModeSwitcher.module.scss";

const DarkModeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setCurrentTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setCurrentTheme("light");
    }
  }, []);

  const changeTheme = () => {
    if (currentTheme === "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setCurrentTheme("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setCurrentTheme("light");
    }
  };

  return <button onClick={changeTheme}>DarkModeSwitcher</button>;
};

export default DarkModeSwitcher;
