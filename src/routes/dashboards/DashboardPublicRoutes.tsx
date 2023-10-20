import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes } from "../";
import Auth from "../../Authentication/auth";

export const DashboardPublicRoutes = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Auth />}>
        {authRoutes.map(({ path, Component }: any, i) => (
          <Route key={`${i}-${path}`} path={path} element={<Component />} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={`${process.env.PUBLIC_URL}`} />} />
    </Routes>
  );
};
