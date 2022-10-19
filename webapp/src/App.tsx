import React, { FC, useEffect } from "react";
import { Layout } from "./components/common";
import AppRoutes from "./routes";
import { IRootState } from "./shared/store";
import { setUserSession } from "./shared/store/actions/auth.action";
import { connect } from "react-redux";
import { auth } from "./utils/firebase/firebase.config";
import { IUser } from "./models";

interface IAppProps extends StateProps, DispatchProps {}

const App: FC<IAppProps> = ({ setUserSession }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserSession(user as IUser);
      }
    });
  }, []);

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = { setUserSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
