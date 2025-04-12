import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const logout = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("RefreshToken");
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};
const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      if (!refreshToken) {
        logout();
        return null;
      }
  
      const response = await fetch("http://localhost:8000/auth/jwt/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!response.ok) {
        logout();
        return null;
      }
  
      const data = await response.json();
      if (data && data.access) {
        localStorage.setItem("AccessToken", data.access);
        return data.access;
      } else {
        logout();
        return null;
      }
    } catch (error) {
      console.error("خطا در دریافت توکن جدید:", error);
      logout();
      return null;
    }
  };
  
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      let token = localStorage.getItem("AccessToken");

      if (!token || isTokenExpired(token)) {
        token = await refreshAccessToken(); 
      }

      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <p>در حال بررسی احراز هویت...</p>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
