import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

const ProtectedRoutes = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
