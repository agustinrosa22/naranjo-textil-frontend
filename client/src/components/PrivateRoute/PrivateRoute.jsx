import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('user'); // Verifica si el usuario está autenticado

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace /> // Redirige a la página de inicio de sesión si no está autenticado
  );
};

export default PrivateRoute;
