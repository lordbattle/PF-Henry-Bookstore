import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/index";

const Profile = () => {
  // no este trayendo el user, solo da undefined

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(getUsers())}>Get users</button>
    </div>
  );
};

export default Profile;
// COMPLETAR EL RETURN CON LOS DATOS QUE VAYA A TENER EL USUARIO Y QUE QUERRAMOS MOSTRAR

//NO EXPORTAR HASTA QUE CORRESPONDA SEGUIR CON EL AUTH!
