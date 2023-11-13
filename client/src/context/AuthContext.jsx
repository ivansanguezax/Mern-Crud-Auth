import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const singup = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log(response.data);
      setUser(response.data);
      setIsAuth(true);
    } catch (error) {
      //   console.log(error.response.data);
      setError(error.response.data);
    }
  };

  const singin = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log(response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data){
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
        
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ singup, user, isAuthenticated, errors, singin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

