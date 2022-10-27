import React, { FC, Fragment, useEffect } from "react";
import s from "./DarkModeSwitcher.module.scss";
import { HiOutlineSun } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";

const DarkModeSwitcher: FC = () => {
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
    <Menu as="div" className={s.container}>
      <div>
        <Menu.Button className={s.menuButton} name="dark">
          <HiOutlineSun className="h-8 w-8 dark:text-white" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={s.menuItems}>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => changeTheme("system")}
                >
                  System
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => changeTheme("dark")}
                >
                  Dark
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => changeTheme("light")}
                >
                  Light
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DarkModeSwitcher;
