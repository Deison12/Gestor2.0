import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  LazyRoute,
  appRoutes,
  customPagesRoutes,
  mainRoutes,
} from "../";
import App from "../../shade/layouts/App";
import Error501 from "../../components/Pages/Authentication/501Error/501Error";
import Custompages from "../../shade/layouts/custompages";
import Switcherapp from "../../shade/layouts/Switcherapp";

export const DashboardPrivateRoutes = () => {
  return (
    <Routes>
      <Route path={`/`} element={<App />}>
        {appRoutes.map(({ path, Component }: LazyRoute, i) => (
          <Route key={`${i}-${path}`} path={path} element={<Component />} />
        ))}
        <Route>
          {mainRoutes.map(({ path, Component }: LazyRoute, i) => (
            <Route key={`${i}-${path}`} path={path} element={<Component />} />
          ))}
        </Route>

        <Route>
          <Route
            path={`${process.env.PUBLIC_URL}/pages/Authentication/501error`}
            element={<Error501 />}
          />
        </Route>
      </Route>

      <Route path={`${process.env.PUBLIC_URL}/`} element={<Custompages />}>
        {customPagesRoutes.map(({ path, Component }: LazyRoute, i) => (
          <Route key={`${i}-${path}`} path={path} element={<Component />} />
        ))}
      </Route>

      <Route>
        <Route
          path={`${process.env.PUBLIC_URL}/pages/switcher/switcher-1`}
          element={<Switcherapp />}
        />
      </Route>

      <Route path="*" element={<Navigate to={`${process.env.PUBLIC_URL}`} />} />

      
    </Routes>
  );
};
