import { useAuth } from "@/auth/AuthContext";
import React from "react";

const HomePage = () => {
  const { currentUser } = useAuth();
  return <div>{currentUser && JSON.stringify(currentUser)}</div>;
};

export default HomePage;
