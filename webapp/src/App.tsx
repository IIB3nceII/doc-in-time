import React, { FC, useEffect } from "react";
import { Layout } from "./components/common";
import { IRootState } from "./shared/store";
import { setUserSession } from "./shared/store/actions/auth.action";
import { connect } from "react-redux";
import { auth } from "./utils/firebase/firebase.config";
import { IUser } from "./models";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppointmentFinder, Calendar, EditProfile, DocRegistration, Home, Login, PageNotFound, Register } from "./pages";
import { clientsLoader } from "./utils/loaders";
import { useTranslation } from "react-i18next";

interface IAppProps extends StateProps, DispatchProps {}

const App: FC<IAppProps> = ({ setUserSession }) => {
  const { i18n } = useTranslation();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/calendar", element: <Calendar /> },
        { path: "/appointment-finder", element: <AppointmentFinder />, loader: clientsLoader },
        { path: "/edit-profile", element: <EditProfile /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/doc-form", element: <DocRegistration clinics={[]} /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    const currentLang = localStorage.lang;

    if (currentLang) {
      i18n.changeLanguage(currentLang);
    } else {
      i18n.changeLanguage("en");
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserSession(user as IUser);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={routes} />;
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = { setUserSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
