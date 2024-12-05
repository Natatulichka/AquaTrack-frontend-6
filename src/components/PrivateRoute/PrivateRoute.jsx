import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthIsLoggedIn } from '../../redux/auth/selector.js';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = Boolean(localStorage.getItem('authToken'));
//   return isAuthenticated ? children : <Navigate to="/signin" />;
// };
export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
