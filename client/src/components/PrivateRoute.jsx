import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


/* componente che ci permette di gestire la rotta user/admin */
const PrivateRoute = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
