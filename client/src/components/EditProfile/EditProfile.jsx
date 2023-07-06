import { useDispatch, useSelector } from "react-redux";
import style from "../EditProfile/EditProfile.module.css";
import { useEffect, useState } from "react";
import { editUser } from "../../redux/actions/index";
import { useForm } from "react-hook-form";


const EditProfile = () => {
  const [userChange, setUserChange] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    profilePic: null,
    age: 0,
  });
  const [isChangeUser, setIsChangeUser] = useState(false);
  const [file, setFile] = useState();

  /*   "password":"holaMundo234@",
  
  "email": "miralapantalla@gmail.com", */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userCurrent = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  /* "password":"holaMunDO234@",
  "lastName": "Alvarez",
  "email": "antonio1234@gmail.com", */

  let user = userCurrent.results;

  console.log("antes de entrar al sumbmit", userChange);

  const onSubmit = async (data) => {
    if (!data.name || !data.lastName) {
      alert("Please fill in the required fields: name, lastName");
      return;
    }

    const formData = new FormData();
    if (!file) {
      alert("Please select an image");
      return;
    }

    formData.append("profilePic", file);
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("userName", data.userName);
    formData.append("phone", data.phone);
    formData.append("age", data.age);

    console.log("formData", formData);

    try {
      await dispatch(editUser(user.id, formData));
      setIsChangeUser(true);
    } catch (error) {
      alert("An error occurred while updating your profile!");
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    setUserChange({
      name: user.name,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      profilePic: null,
      age: user.age,
    });
  }, [user]);

  return (
    <div className={style.containerForm}>
      <h4>Edit Your Profile</h4>
      <form
        className="d-flex flex-column align-items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          defaultValue={userChange.name}
        />
        {errors.name && <span>Name is required</span>}

        <input
          type="text"
          {...register("lastName", { required: true })}
          placeholder="Last Name"
          defaultValue={userChange.lastName}
        />
        {errors.lastName && <span>Last Name is required</span>}

        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="Email"
          defaultValue={userChange.email}
        />
        {errors.email && <span>Email is required</span>}

        <input
          type="text"
          {...register("userName", { required: true })}
          placeholder="Username"
          defaultValue={userChange.userName}
        />
        {errors.userName && <span>Username is required</span>}

        <input
          type="text"
          {...register("phone", { required: true })}
          placeholder="Phone"
          defaultValue={userChange.phone}
        />
        {errors.phone && <span>Phone is required</span>}

        <input
          type="file"
          {...register("profilePic", { required: true })}
          onChange={handleImageChange}
        />
        {errors.profilePic && <span>Profile Picture is required</span>}

        <input
          type="text"
          {...register("age", { required: true })}
          placeholder="Age"
          defaultValue={userChange.age}
        />
        {errors.age && <span>Age is required</span>}

        <button type="submit">Save Profile</button>
      </form>
      {isChangeUser && <div>The user has been modified</div>}
    </div>
  );
};

export default EditProfile;
