import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated, screenLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!screenLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, screenLoading]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
