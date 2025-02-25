import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({ loggedInUserToken }) {
  return loggedInUserToken ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
