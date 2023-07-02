//import { useAuth0 } from "@auth0/auth0-react";
//import {  useSelector } from "react-redux";
/* import { getUserById, cleanUserDetail } from "../../redux/actions/index";
import { useEffect } from "react"; */

import { UserAuth } from "../../context/AuthContextFirebase";

const Profile = () => {
  /*  const { user } = useAuth0();
  console.log(user); */
  /*  const dispatch = useDispatch(); */
  // no este trayendo el user, solo da undefined

  /* const { currentUser } = useSelector((state) => state); */
  const { user } = UserAuth();
  /* useEffect(() => {
    dispatch(getUserById(1));
    return () => {
      dispatch(cleanUserDetail());
    };
  }, []); */

  console.log(user);

  return (
    <div style={{ height: "100vh" }}>
      {user && (
        <>
          <img src={user.photoURL} width="100px" />
          <h4> {user.displayName || user.name}</h4>
          <h4>{user.email}</h4>
        </>
      )}
    </div>
  );
};

export default Profile;
// COMPLETAR EL RETURN CON LOS DATOS QUE VAYA A TENER EL USUARIO Y QUE QUERRAMOS MOSTRAR

//NO EXPORTAR HASTA QUE CORRESPONDA SEGUIR CON EL AUTH!
