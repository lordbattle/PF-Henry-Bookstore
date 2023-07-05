import { useDispatch, useSelector } from "react-redux";
import style from "../EditProfile/EditProfile.module.css";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [userChange, setUserChange] = useState({
    name: "",
    lastName: "",
    email: "",
    userName: "",
    phone: "",
    profilePic: "",
    age: 0,
  });
  const userCurrent = useSelector((state) => state.userDetail);
 // const dispatch = useDispatch()
  const handleChangeUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserChange((propAfter) =>({
        ...propAfter,
        [name]: value,
      })
    );
  };

  console.log("estoy en edit profile", userCurrent);
 // let user = userCurrent.results;

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  //hoLa1234@ passaword

  /* useEffect(() => {
    setUserChange(user);
  }, [user]); */

  return (
    <div className={style.containerForm}>
      <h4>Edit you Profile</h4>
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
          name="email"
          placeholder="Email"
          value={userChange.email}
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
          type="text"
          name="profilePic"
          placeholder="Profile Pic"
          value={userChange.profilePic}
          onChange={handleChangeUser}
        />

        <input
          type="text"
          name="age"
          placeholder="Age"
          value={userChange.age}
          onChange={handleChangeUser}
        />
        <button value="Submit" >Save Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
