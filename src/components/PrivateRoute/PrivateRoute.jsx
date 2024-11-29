import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
