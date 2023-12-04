
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  loginSuccess: boolean | null;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isLoggedIn, loginSuccess, element }: PrivateRouteProps) => {
  if (!isLoggedIn || (loginSuccess === false)) {
    return <Navigate to="Login /" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
