import { useSelector, useDispatch } from "react-redux";
import style from "./EditProfileDashboard.module.css";
import { useState } from "react";
import { editUser } from "../../../../redux/actions/index";
import { useForm } from "react-hook-form";
import axios from "axios";
/* const {REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUINARY_URL} = process.env; */

const cloudinary_cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinary_url = import.meta.env.VITE_CLOUINARY_URL;

const EditProfileDashboard = ({ setUserEdit, userEdit }) => {
  console.log(userEdit, ' estamos en edit ')
  const [userChange, setUserChange] = useState({
    banned: "",
    active: "",
    admin: ''
  });
  const [isChangeUser, setIsChangeUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  /* useEffect(() => {
    setUserChange({
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      profilePic: "",
      age: user.age,
    });
  }, [user]); */

  const onSubmit = async (data) => {
    if (!data.name || !data.lastName) {
      alert("Please fill in the required fields: name, lastName");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${cloudinary_cloud_name}`); // Corregir el nombre del preset de carga
      const { data } = await axios.post(`${cloudinary_url}`, formData);

      let { secure_url } = data;
      console.log(secure_url);

      let newObj = {
        ...userChange,
        profilePic: secure_url,
      };

      dispatch(editUser(user.id, newObj));
      setIsChangeUser(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserChange((supUser) => ({
      ...supUser,
      [name]: value,
    }));
  };

  const admin = () => {

  }

  const handleReverse = () => {
    setUserEdit([]);
  }
  return (
    <div className={style.containerEdit}>
      <h4>Edit User  ID: {userEdit.id}</h4>

      <div className={style.containerSecond}>
        <div className={style.info}>
          <button className={style.buttonVolver} onClick={handleReverse}>volver</button>
          <img className={style.imagePic} src={userEdit.profilePic} alt="profilePic" />
          <h2>{userEdit.name}</h2>
          <h2>{userEdit.lastName}</h2>
          <label>UserName: {userEdit.userName}</label>
          <label>Email: {userEdit.email}</label>
          <label>Age: {userEdit.age}</label>
          <label>Genres: {userEdit.genres}</label>
          <label>Phone: {userEdit.phone}</label>
          <label>location: {userEdit.location}</label>
          <label>GoogleUser: {userEdit.googleUser ? 'true' : 'false'}</label>
          <label>Active: {userEdit.active ? 'true' : 'false'}</label>
          <label>Banned: {userEdit.banned ? 'true' : 'false'}</label>
          <label>Admin: {userEdit.admin ? 'true' : 'false'}</label>
        </div>
        <div className={style.formEdit}>
          <form
            className="d-flex flex-column align-items-center "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label>Admin</label>
              <input type="radio" id="radioT" value="true" name='admin' onChange={admin} /> <label htmlFor="radioT">True</label><br />
              <input type="radio" id="radioF" value="false" name='admin' onChange={admin} /><label htmlFor="radioF">False</label>

            </div>
            <div>
              <label>Active</label>
              <input type="radio" id="radioT" value="true" name='admin' onChange={admin} /> <label htmlFor="radioT">True</label><br />
              <input type="radio" id="radioF" value="false" name='admin' onChange={admin} /><label htmlFor="radioF">False</label>

            </div>
            <div>
              <label>Banned</label>
              <input type="radio" id="radioT" value="true" name='admin' onChange={admin} /> <label htmlFor="radioT">True</label><br />
              <input type="radio" id="radioF" value="false" name='admin' onChange={admin} /><label htmlFor="radioF">False</label>

            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder={userEdit.name}
              onChange={handleChange}
              value={userChange.name}
            />
            {errors.name && <span>Name is required</span>}
            <button type="submit">Save Profile</button>
          </form>
          {isChangeUser && <div>The user has been modified</div>}
        </div>
      </div>
    </div>
  );
};

export default EditProfileDashboard;
