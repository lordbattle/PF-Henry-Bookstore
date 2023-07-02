import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/index";

const Profile = () => {
    const {user} = useAuth0();

// no este trayendo el user, solo da undefined
    console.log(user);
    const dispatch = useDispatch();

    return (
        
            <div>
            <button onClick={() => dispatch(getUsers())}>Get users</button>
            
        </div>
        
    )
}

export default Profile;
// COMPLETAR EL RETURN CON LOS DATOS QUE VAYA A TENER EL USUARIO Y QUE QUERRAMOS MOSTRAR

//NO EXPORTAR HASTA QUE CORRESPONDA SEGUIR CON EL AUTH!