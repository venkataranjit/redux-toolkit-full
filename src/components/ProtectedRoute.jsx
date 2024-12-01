import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userState = useSelector((state) => state.user);

  if (!userState.loggedInUser?.email) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
