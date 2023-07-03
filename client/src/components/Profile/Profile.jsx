import { useDispatch, useSelector } from "react-redux";
/* import { getUserById, cleanUserDetail } from "../../redux/actions/index";
import { useEffect } from "react"; */

import { UserAuth } from "../../context/AuthContextFirebase";
import { getUserById } from "../../redux/actions";
import { useEffect, useState } from "react";
const Profile = () => {
  const dispatch = useDispatch();

  let userCurrent = useSelector((state) => state.userDetail);
  const userLogin = useSelector((state) => state.user);
  //const [reload, setReload] = useState(false);

  /* useEffect(() => {
    dispatch(getUserById(userLogin.id));
    return () => {
      dispatch(cleanUserDetail());
    };
  }, []);
 */

  useEffect(() => {
    dispatch(getUserById(userLogin.id));
  }, [dispatch]);

  // no este trayendo el user, solo da undefined

  /* const { currentUser } = useSelector((state) => state); */

  console.log("holaa " + userLogin.userName);
  console.log("PROBANDO TRAER USUARIO " + userCurrent.results.id);
  console.log("PROBANDO TRAER USUARIO " + userCurrent.results.email);
  console.log("PROBANDO TRAER USUARIO " + userCurrent.results.age);
  console.log("PROBANDO TRAER USUARIO " + userCurrent.results.genres);

  return (
    <div style={{ height: "100vh" }}>
      {userCurrent && (
        <>
          <img src={userCurrent.results.profilePic} width="100px" />
          <h4> username: {userCurrent.results.userName}</h4>
          <h4> name: {userCurrent.results.name}</h4>
          <h4> lastName: {userCurrent.results.lastName}</h4>
          <h4> email: {userCurrent.results.email}</h4>
          <h4> age: {userCurrent.results.age}</h4>
          <h4> location: {userCurrent.results.location}</h4>
          <h4> phone: {userCurrent.results.phone}</h4>
        </>
      )}
    </div>
  );
};

export default Profile;
