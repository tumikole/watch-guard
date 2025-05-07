import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
