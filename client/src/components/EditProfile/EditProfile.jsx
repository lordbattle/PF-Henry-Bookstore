import { useDispatch, useSelector } from "react-redux";
import style from "../EditProfile/EditProfile.module.css";
import { useEffect, useState } from "react";
import { editUser } from "../../redux/actions/index";


const EditProfile = () => {
  const [userChange, setUserChange] = useState({
    name: "",
    lastName: "",
    userName: "",
    phone: "",
    profilePic: null, // Cambiado a null para almacenar la imagen seleccionada
    age: 0,
  });
  const [isChangeUser, setIsChangeUser] = useState(false);

  const userCurrent = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  const handleChangeUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "profilePic") {
      // Obtén el archivo de la imagen seleccionada
      const file = e.target.files[0];
      setUserChange((prevUserChange) => ({
        ...prevUserChange,
        [name]: file,
      }));
    } else {
      setUserChange((prevUserChange) => ({
        ...prevUserChange,
        [name]: value,
      }));
    }
  };

  let user = userCurrent.results;

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(user.id, userChange));
    setIsChangeUser(true);
  };

  useEffect(() => {
    setUserChange({
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      phone: user.phone,
      profilePic: null,
      age: user.age,
    });
  }, [user]);

  return (
    <div className={style.containerForm}>
      <h4>Edit Your Profile</h4>
      <form className="d-flex flex-column align-items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChangeUser}
          name="name"
          placeholder="Name"
          value={userChange.name}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userChange.lastName}
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="userName"
          placeholder="UserName"
          value={userChange.userName}
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userChange.phone}
          onChange={handleChangeUser}
        />
        <input
          type="file"
          name="profilePic"
          placeholder="Profile Pic"
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={userChange.age}
          onChange={handleChangeUser}
        />
        <button type="submit">Save Profile</button>
      </form>
      {isChangeUser && <div>El usuario se ha modificado</div>}
    </div>
  );
};

export default EditProfile;