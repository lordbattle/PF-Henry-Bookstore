import { useDispatch } from "react-redux";
import { UserAuth } from "../../context/AuthContextFirebase";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions";

const Logout = () => {
  const dispatch = useDispatch();
  const { logout } = UserAuth();
  const navigate = useNavigate();

  /* useEffect(() => {
    dispatch(loginGoogle(user));
  }, [user]); */

  const handlerLogOut = async () => {
    await logout();
    dispatch(logoutUser());
    navigate("/");
  };

  return <button onClick={handlerLogOut} />;

};

export default Logout;
