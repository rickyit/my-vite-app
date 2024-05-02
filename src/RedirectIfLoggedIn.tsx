import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

const RedirectIfLoggedIn = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }
};

export default RedirectIfLoggedIn;
