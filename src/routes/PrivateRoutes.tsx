import React from "react";
import { Navigate } from "react-router-dom";
import ClearLocalStorageHOC from "../hoc/ClearLocalStorageHOC";

export const PrivateRoutes = ({ isAuth, children, navigate }: any) => {
    return (
        <ClearLocalStorageHOC navigate={navigate}>
            {isAuth ? children : <Navigate to={`${process.env.PUBLIC_URL}/authentication`} />}
        </ClearLocalStorageHOC>
    );
};
