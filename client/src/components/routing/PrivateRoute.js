// Imports
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { token, loading } = authContext;

  return token && !loading ? children : <Navigate to='/' />;
};

export default PrivateRoute;
