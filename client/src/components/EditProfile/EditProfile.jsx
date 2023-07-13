import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editUser, getUserById } from "../../redux/actions/index";
import { useForm } from "react-hook-form";
import validationsEditProfile from "../../hooks/validationsEditProfile";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./EditProfile.module.css";

const cloudinary_cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinary_url = import.meta.env.VITE_CLOUINARY_URL;

const EditProfile = () => {
  const userCurrent = useSelector((state) => state.userDetail);

  let userDataLocal = JSON.parse(localStorage.getItem("userData")) || null;

  const userDataLogin = JSON.parse(localStorage.getItem("userDataLogin"));

  if (userCurrent && userCurrent !== undefined) {
    userDataLocal = JSON.parse(localStorage.getItem("userData"));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(userDataLogin.id));
  }, [dispatch, userDataLogin.id]);

  //let user = userCurrent.results;

  const [userChange, setUserChange] = useState({
    name: userDataLocal.name || "",
    lastName: userDataLocal.lastName || "",
    email: userDataLocal.email || "",
    userName: userDataLocal.userName || "",
    location: userDataLocal.location || "",
    age: userDataLocal.age || 18,
    genres: userDataLocal.genres || "",
    phone: userDataLocal.phone || "",
    profilePic: userDataLocal.profilePic || "",
  });
  const [isChangeUser, setIsChangeUser] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [validationErrors, setValidationErrors] = useState({}); // Estado para los errores de validación

  const editUserAsync = (userId, data) => {
    return new Promise((resolve, reject) => {
      dispatch(editUser(userId, data))
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let newObj = { ...userChange };

      const validationErrors = validationsEditProfile(userChange);
      if (Object.keys(validationErrors).length > 0) {
        setValidationErrors(validationErrors);
        return;
      }

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", `${cloudinary_cloud_name}`);

        const { data } = await axios.post(`${cloudinary_url}`, formData);
        const secure_url = data.secure_url;

        newObj = {
          ...newObj,
          profilePic: secure_url,
        };
      } else {
        const { profilePic, ...rest } = newObj;
        newObj = rest;
      }

      await editUserAsync(userDataLogin.id, newObj);
      setIsChangeUser(true);

      Swal.fire({
        icon: "success",
        title: "Data changed successfully!",
        text: "Your data has been successfully modified!",
        backdrop: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while changing data. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserChange((supUser) => ({
      ...supUser,
      [name]: value,
    }));
    validateField(name, value); // Agrega esta línea para realizar la validación en tiempo real
  };

  const validateField = (fieldName, value) => {
    const validationErrors = validationsEditProfile({ [fieldName]: value });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validationErrors[fieldName] || "",
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.containerForm}>
      <h4>Edit Your Profile</h4>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: false })}
            placeholder={userDataLocal.name}
            onChange={handleChange}
            value={userChange.name}
          />
          {validationErrors.name && (
            <span className={styles.error}>{validationErrors.name}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            {...register("lastName", { required: false })}
            placeholder={userDataLocal.lastName}
            onChange={handleChange}
            value={userChange.lastName}
          />
          {validationErrors.lastName && (
            <span className={styles.error}>{validationErrors.lastName}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            {...register("email", { required: false })}
            placeholder={userDataLocal.email}
            onChange={handleChange}
            value={userChange.email}
          />
          {validationErrors.email && (
            <span className={styles.error}>{validationErrors.email}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            {...register("userName", { required: false })}
            placeholder={userDataLocal.userName}
            onChange={handleChange}
            value={userChange.userName}
          />
          {validationErrors.userName && (
            <span className={styles.error}>{validationErrors.userName}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            {...register("location", { required: false })}
            placeholder={userDataLocal.location}
            onChange={handleChange}
            value={userChange.location}
          />
          {validationErrors.location && (
            <span className={styles.error}>{validationErrors.location}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            {...register("age", { required: false })}
            placeholder={userDataLocal.age}
            onChange={handleChange}
            value={userChange.age}
          />
          {validationErrors.age && (
            <span className={styles.error}>{validationErrors.age}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="genres">Genre:</label>
          <select
            id="genres"
            name="genres"
            {...register("genres", { required: false })}
            value={userChange.genres}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="not specified">Not Specified</option>
          </select>
          {validationErrors.genres && (
            <span className={styles.error}>{validationErrors.genres}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            {...register("phone", { required: false })}
            placeholder={userDataLocal.phone}
            onChange={handleChange}
            value={userChange.phone}
          />
          {validationErrors.phone && (
            <span className={styles.error}>{validationErrors.phone}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="profilePic">Profile picture:</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            {...register("profilePic", { required: false })}
            onChange={handleImageChange}
          />
        </div>
        {errors.profilePic && (
          <span className={styles.error}>Profile Picture is required</span>
        )}

        <div className="_dropdown_toggle_15isk_51">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile"
              className={styles.profilePicDropdown}
            />
          )}
        </div>

        <button type="submit">Save Profile</button>
      </form>
      {isChangeUser && (
        <div className={styles.isChangeUser}>The user has been modified</div>
      )}
    </div>
  );
};

export default EditProfile;
