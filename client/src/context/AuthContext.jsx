import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
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

  const singin = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log(response.data);
      setUser(response.data);
      setIsAuth(true);
    } catch (error) {
      if(Array.isArray(error.response.data)){
       return setError(error.response.data);
      }
      setError([error.response.data.message]);
    }
  }

  useEffect(()=>{
    if(errors.length > 0){
      const timer = setTimeout(()=>{
        setError([])
      }, 5000)
      return ()=> clearTimeout(timer)
    }
  }, [errors])

  return (
    <AuthContext.Provider value={{ singup, user, isAuth, errors, singin }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
