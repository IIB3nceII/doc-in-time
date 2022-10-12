import React, { FC } from "react";
import { Layout } from "./components/common";
import AppRoutes from "./routes";

const App: FC = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
