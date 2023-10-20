import React from 'react'
import { Navigate } from 'react-router-dom'
import ClearLocalStorageHOC from '../hoc/ClearLocalStorageHOC';

export const PublicRoutes = ({ isAuth, children, navigate }: any) => {
  return (
    <ClearLocalStorageHOC navigate={navigate}>
      {!isAuth ? children : <Navigate to={`${process.env.PUBLIC_URL}/inicio`} />}
    </ClearLocalStorageHOC>
  );
};
