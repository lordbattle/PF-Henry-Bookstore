import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user);
  const userCurrent = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserById(userLogin.id));
  }, [dispatch, userLogin.id]);

  console.log("estado user del login: " + userLogin.id);
  console.log("estado userDetail: ", userCurrent.results);

  return (
    <div style={{ height: "100vh" }}>
      {userCurrent.results && (
        <div className="w-50 d-flex flex-column align-items-center">
          <img src={userCurrent.results.profilePic} width="100px" />

          <h4>Username: {userCurrent.results.userName}</h4>
          <h4>Name: {userCurrent.results.name}</h4>
          <h4>Last Name: {userCurrent.results.lastName}</h4>
          <h4>Email: {userCurrent.results.email}</h4>
          <h4>Age: {userCurrent.results.age}</h4>
          <h4>Location: {userCurrent.results.location}</h4>
          <h4>Phone: {userCurrent.results.phone}</h4>

           
           <Link
              to={"/ChangePassword"}
              className="text-decoration-none fs-6 text-reset"
            >
              Edit password
            </Link>
        </div>
      )}


          <Link
            to={"/ChangePassword"}
            className="text-decoration-none fs-6 text-reset"
          >
            Edit password
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
