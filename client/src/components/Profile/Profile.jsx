import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserAuth } from "../../context/AuthContextFirebase";
import { logoutUser } from "../../redux/actions";
import style from "./Profile.module.css";

const Profile = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const userCurrent = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserById(userLogin.id));
  }, [dispatch, userLogin.id]);

  setTimeout(() => {
    localStorage.setItem("userData", JSON.stringify(userCurrent.results));
  }, 3000);

  //logout------------------
  const handlerLogOut = async () => {
    await logout();
    dispatch(logoutUser());

    navigate("/");
  };

  const alert = () => {
    Swal.fire({
      title: "Log out",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        handlerLogOut();
        localStorage.setItem("userData", JSON.stringify([]));
        localStorage.setItem("userDataLogin", JSON.stringify([]));
        Swal.fire("Log out!", "", "success");
      } else {
        navigate("/home");
      }
    });
  };

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <>
      <div
        className={style.dropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {userCurrent.results && (
          <div className={style.dropdown_toggle}>
            {userCurrent.results.userName}
          </div>
        )}

        {isActive && (
          <ul className={style.dropdown_menu}>
            {userCurrent.results && (
              <li className={style.dropdown_item_profile}>
                <img src={userCurrent.results.profilePic} width="70px" />
                <h4>{userCurrent.results.userName}</h4>
              </li>
            )}
            <li className={style.dropdown_item}>
              <Link
                to={"/editprofile"}
                className="text-black text-decoration-none fs-6"
              >
                Edit Profile
              </Link>
            </li>
            <li className={style.dropdown_item}>
              <Link
                to={"/ChangePassword"}
                className="text-black text-decoration-none fs-6"
              >
                Reset Password
              </Link>
            </li>
            <li className={style.dropdown_item}>
            <Link
                to={"/purchasehistory"}
                className="text-black text-decoration-none fs-6"
              >
                Purchase history
              </Link>
            </li>
            <li className={style.dropdown_item}>
              <NavLink
                className="text-black text-decoration-none fs-6"
                onClick={alert}
              >
                Log Out
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Profile;

/* <div className="text-center align-items-center dropdown">
{userCurrent.results && (
  <a
    className="btn dropdown-toggle text-black d-flex align-items-center gap-1 p-0"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <h5 className="m-0 p-0">{userCurrent.results.userName}</h5>
  </a>
)}
<ul className="dropdown-menu px-5" aria-labelledby="dropdownMenuLink">
  {userCurrent.results && (
    <li className="dropdown-item">
      <img src={userCurrent.results.profilePic} width="100px" />

      <h4>{userCurrent.results.userName}</h4>
    </li>
  )}
  <li className="dropdown-item">
    <Link to={"/editprofile"} className="text-decoration-none fs-6">
      Edit Profile
    </Link>
  </li>
  <li className=" dropdown-item">
    <Link to={"/ChangePassword"} className="text-decoration-none fs-6 ">
      Reset Password
    </Link>
  </li>
  <li className=" dropdown-item">
    <button onClick={alert}>Log Out</button>
  </li>
</ul>
</div> */
