import { useDispatch } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions";
import { useEffect, useState } from "react";

const Logout = () => {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const { logout } = UserAuth();
  const navigate = useNavigate();

  /* useEffect(() => {
    dispatch(loginGoogle(user));
  }, [user]); */

  useEffect(() => {
    setIsLogout(true);
  }, []);

/*   const deleteLocalStorage = () => {
    localStorage.setItem("userData", JSON.stringify([]));
    localStorage.setItem("userDataLogin", JSON.stringify([]));
  }; */
  
  const handlerLogOut = async () => {
    // deleteLocalStorage();
    await logout();
    dispatch(logoutUser());
    navigate("/");
  };
  
  return (
    <>
      {isLogout ? (
        <div className="logout">
          <h1>Are you sure you want to log out of your account?</h1>
          <button onClick={handlerLogOut}>YES</button>
          <button onClick={() => navigate("/home")}>NO</button>
        </div>
      ) : null}
    </>
  );
};

export default Logout;
