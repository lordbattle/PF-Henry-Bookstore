//import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, cleanUserDetail } from "../../redux/actions/index";
import { useEffect } from "react";

const Profile = () => {
  /*  const { user } = useAuth0();
  console.log(user); */
  const dispatch = useDispatch();
  // no este trayendo el user, solo da undefined

  const { userDetail } = useSelector((state) => state);
  const userR = userDetail.results;
  useEffect(() => {
    dispatch(getUserById(1));
    return () => {
      dispatch(cleanUserDetail());
    };
  }, []);

  console.log(userDetail);

  return (
    <div style={{ height: "100vh" }}>
      {userR && (
        <>
          <img src={userR.profilePic} width="100px" />
          <h4>UserName: {userR.userName}</h4>
          <h4>Email: {userR.email}</h4>
          <h4>Phone: {userR.phone}</h4>
          <h4>Age: {userR.age}</h4>
        </>
      )}
    </div>
  );
};

export default Profile;
// COMPLETAR EL RETURN CON LOS DATOS QUE VAYA A TENER EL USUARIO Y QUE QUERRAMOS MOSTRAR

//NO EXPORTAR HASTA QUE CORRESPONDA SEGUIR CON EL AUTH!
