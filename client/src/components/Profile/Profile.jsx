import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserAuth } from "../../context/AuthContextFirebase";
import { logoutUser } from "../../redux/actions";

const Profile = () => {
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

  return (
    <div
      style={{ height: "100vh", margin: "0 auto", width: "50%" }}
      className=" d-flex flex-column gap-3 text-center align-items-center"
    >
      {userCurrent.results && (
        <div className=" d-flex  align-items-center justify-content-center gap-3 m-0">
          <img src={userCurrent.results.profilePic} width="100px" />

          <h4>{userCurrent.results.userName}</h4>
        </div>
      )}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link
            to={"/editprofile"}
            className="text-decoration-none fs-6 text-reset"
          >
            Edit Profile
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            to={"/ChangePassword"}
            className="text-decoration-none fs-6 text-reset"
          >
            Reset Password
          </Link>
        </li>
        <li className="list-group-item">
          <button className="" onClick={alert}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
