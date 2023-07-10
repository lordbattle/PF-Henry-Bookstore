import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editUser } from "../../redux/actions/index";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./EditProfile.module.css";

const cloudinary_cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinary_url = import.meta.env.VITE_CLOUINARY_URL;

const EditProfile = () => {
  const [userChange, setUserChange] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    profilePic: "",
    age: 0,
  });
  const [isChangeUser, setIsChangeUser] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userCurrent = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  let user = userCurrent.results;

  const onSubmit = async (data) => {
    if (!data.name || !data.lastName) {
      alert("Please fill in the required fields: name, lastName");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${cloudinary_cloud_name}`);
      const { data } = await axios.post(`${cloudinary_url}`, formData);

      let { secure_url } = data;

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className={styles.containerForm}>
      <h4>Edit Your Profile</h4>
      <form className="d-flex flex-column align-items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder={user.name}
          onChange={handleChange}
          value={userChange.name}
        />
        {errors.name && <span>Name is required</span>}

        <input
          type="text"
          {...register("lastName", { required: true })}
          placeholder={user.lastName}
          onChange={handleChange}
          value={userChange.lastName}
        />
        {errors.lastName && <span>Last Name is required</span>}

        <input
          type="text"
          {...register("email", { required: true })}
          placeholder={user.email}
          onChange={handleChange}
          defaultValue={userCurrent.email}
        />
        {errors.email && <span>Email is required</span>}

        <input
          type="text"
          {...register("userName", { required: true })}
          placeholder={user.userName}
          onChange={handleChange}
          defaultValue={userChange.userName}
        />
        {errors.userName && <span>Username is required</span>}

        <input
          type="text"
          {...register("phone", { required: true })}
          placeholder={user.phone}
          onChange={handleChange}
          defaultValue={userChange.phone}
        />
        {errors.phone && <span>Phone is required</span>}

        <input type="file" {...register("profilePic", { required: true })} onChange={handleImageChange} />
        {errors.profilePic && <span>Profile Picture is required</span>}

        <input
          type="text"
          {...register("age", { required: true })}
          placeholder={user.age}
          onChange={handleChange}
          defaultValue={userChange.age}
        />
        {errors.age && <span>Age is required</span>}

        <button type="submit">Save Profile</button>
      </form>
      {isChangeUser && <div className={styles.isChangeUser}>The user has been modified</div>}
    </div>
  );
};

export default EditProfile;






















