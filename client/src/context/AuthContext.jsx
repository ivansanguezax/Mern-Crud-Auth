import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setError] = useState([]);

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

  return (
    <AuthContext.Provider value={{ singup, user, isAuth, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
