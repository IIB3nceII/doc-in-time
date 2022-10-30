import React, { FC, useEffect } from "react";
import { Layout } from "./components/common";
import { IRootState } from "./shared/store";
import { setUserSession } from "./shared/store/actions/auth.action";
import { connect } from "react-redux";
import { auth } from "./utils/firebase/firebase.config";
import { IUser } from "./models";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppointmentFinder, Calendar, EditProfile, Home, Login, PageNotFound, Register } from "./pages";
import { clientsLoader } from "./utils/loaders";

interface IAppProps extends StateProps, DispatchProps {}

const App: FC<IAppProps> = ({ setUserSession }) => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/calendar", element: <Calendar /> },
        { path: "/appointment-finder", element: <AppointmentFinder />, loader: clientsLoader },
        { path: "/edit-profile", element: <EditProfile /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);

  useEffect(() => {
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
