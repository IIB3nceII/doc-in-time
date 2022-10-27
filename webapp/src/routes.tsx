import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Calendar, EditProfile, Home, Login, PageNotFound, Register } from "./pages";

const AppRoutes: FC = () => {
  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);
  return (
    <Routes>
      <Route path="/calendar" element={<Calendar />}></Route>
      <Route path="/edit-profile" element={<EditProfile />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default AppRoutes;
