import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logingUser, postUsers, verifyUser } from "../redux/actions/index";
import { registerRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

//Va a manejar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used whitin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  /* const signup = async (user) => {
    try {
      //redux
      const res = dispatch(postUsers(user));
      //const res = await registerRequest(user)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await dispatch(logingUser(user));
      console.log(res);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors(error.response.data.message);
    }
  }; */

  /* useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [errors]); */

  useEffect(() => {
    function checkLogin() {
      const cookies = Cookies.get();
      console.log(cookies);

      if (cookies.token) {
        try {
          const res = verifyUser(cookies.token);
          if (!res.data) {
            setIsAuthenticated(false);
            setUser(null);
            console.log(isAuthenticated);
            console.log(user);
            return;
          }

          setIsAuthenticated(true);
          setUser(res.data);
          console.log(isAuthenticated);
          console.log(user);
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
          console.log(isAuthenticated);
          console.log(user);
        }
        console.log(cookies.token);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

//export { AuthContext, AuthProvider };
