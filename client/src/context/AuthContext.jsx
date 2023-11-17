import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

// Create a context for authentication
export const AuthContext = createContext();

// Custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State variables for user, authentication status, errors, and loading state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle user registration
  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  // Function to handle user login
  const signin = async (user) => {
    try {
      const response = await loginRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setError(error.response.data);
      } else {
        setError([error.response.data.message]);
      }
    }
  };

  // Function to handle user logout
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // useEffect to clear errors after a certain time
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // useEffect to check the user's authentication status on component mount
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
        if (!res.data) {
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

    // Call the checkLogin function
    checkLogin();
  }, []);

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider
      value={{ signup, logout, signin, user, isAuthenticated, errors, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node,
};
