// PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isLoggedIn, element }: PrivateRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
