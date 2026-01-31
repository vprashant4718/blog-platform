import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

const Private = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/isUserLogin");
        setIsAuth(true);
        setLoading(false);
      } catch (error) {
          setLoading(false);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
