import React, { FC, useEffect } from "react";
import { DarkModeSwitcher } from "./components/ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Layout } from "./components/common";

const App: FC = () => {
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
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
