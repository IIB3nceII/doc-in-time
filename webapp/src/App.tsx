import React, { FC, useEffect } from "react";
import { Layout } from "./components/common";
import AppRoutes from "./routes";
import { useSession } from "./shared/hooks";
import { IRootState } from "./shared/store";
import { setUser } from "./shared/store/actions/auth.action";
import { connect } from "react-redux";

interface IAppProps extends StateProps, DispatchProps {}

const App: FC<IAppProps> = ({ setUser }) => {

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = { setUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
