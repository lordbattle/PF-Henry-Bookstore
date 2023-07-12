import { useDispatch } from "react-redux";
import style from "./EditProfileDashboard.module.css";
import { useState } from "react";
import { editUser } from "../../../../redux/actions/index";
import Swal from "sweetalert2";


const EditProfileDashboard = ({ back, userEdit }) => {
  const dispatch = useDispatch();
  const [userChange, setUserChange] = useState({
    banned: "",
    active: "",
    admin: ''
  });
  const [isChangeUser, setIsChangeUser] = useState(false);

  const upInfo = async () => {
    let newEdit = {
      name: userEdit.name,
      lastName: userEdit.lastName,
      userName: userEdit.userName,
      admin,
      active,
      banned
    }


    newEdit = {
      ...newEdit,
      admin: userChange === '' ? userEdit.admin : userChange.admin === 'true' ? true : false,
      active: userChange === '' ? userEdit.active : userChange.active === 'true' ? true : false,
      banned: userChange === '' ? userEdit.banned : userChange.banned === 'true' ? true : false
    }

    console.log(newEdit, ' nuevo a mandar ')
    try {
      dispatch(editUser(userEdit.id, newEdit));
      setIsChangeUser(true);
      Swal.fire({
        icon: "success",
        title: "Edit User!",
        text: "User edited successfully!",
        backdrop: true,
      });
      setTimeout(() => { back(); }, '1500')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upps !",
        text: `Something went wrong ${error.response.data}`,
        backdrop: true,
      }); 
    }
    
  };


  const admin = (event) => {
    setUserChange({
      ...userChange,
      [event.target.name]: event.target.defaultValue
    })
  }

  const active = (event) => {
    setUserChange({
      ...userChange,
      [event.target.name]: event.target.defaultValue
    })
  }

  const banned = (event) => {
    setUserChange({
      ...userChange,
      [event.target.name]: event.target.defaultValue
    })
  }

  const handleReverse = () => {
    back();
  }
  return (
    <div className={style.containerEdit}>
      <h2 style={{ fontWeight: 'bold' }}>Edit User  ID: {userEdit.id}</h2>

      <div className={style.containerSecond}>
        <div className={style.info}>
          <button className={style.buttonVolver} onClick={handleReverse}>Back</button>
          <img className={style.imagePic} src={userEdit.profilePic} alt="profilePic" />
          
          <h2>{userEdit.name} {userEdit.lastName}</h2>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>UserName: </span></div><div className={style.dos}><p>{userEdit.userName}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Email: </span></div><div className={style.dos}><p>{userEdit.email}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Age: </span></div><div className={style.dos}><p>{userEdit.age}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Genres: </span></div><div className={style.dos}><p>{userEdit.genres}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Phone: </span></div><div className={style.dos}><p>{userEdit.phone}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>location: </span></div><div className={style.dos}><p>{userEdit.location}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>GoogleUser: </span></div><div className={style.dos}><p>{userEdit.googleUser ? 'true' : 'false'}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Active: </span></div><div className={style.dos}><p>{userEdit.active ? 'true' : 'false'}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Banned: </span></div><div className={style.dos}><p>{userEdit.banned ? 'true' : 'false'}</p></div></div>
          <div className={style.rowsInfo}><div className={style.uno}><span className={style.span}>Admin: </span></div><div className={style.dos}><p>{userEdit.admin ? 'true' : 'false'}</p></div></div>

        </div>
        <div className={style.formEdit}>
          <div>
            <div className={style.divRadio}>
              <span className={style.span}>Admin: </span>
              <input type="radio" id="radioT" value="true" name='admin' onChange={admin} /> <label htmlFor="radioT">True</label>
              <input type="radio" id="radioF" value="false" name='admin' onChange={admin} /><label htmlFor="radioF">False</label>

            </div>
            <div className={style.divRadio}>
              <span className={style.span}>Active: </span>
              <input type="radio" id="radioT" value="true" name='active' onChange={active} /> <label htmlFor="radioT">True</label>
              <input type="radio" id="radioF" value="false" name='active' onChange={active} /><label htmlFor="radioF">False</label>

            </div>
            <div className={style.divRadio}>
              <span className={style.span}>Banned: </span>
              <input type="radio" id="radioT" value="true" name='banned' onChange={banned} /> <label htmlFor="radioT">True</label>
              <input type="radio" id="radioF" value="false" name='banned' onChange={banned} /><label htmlFor="radioF">False</label>

            </div>

            <button className={style.buttonEdit} type="submit" onClick={upInfo}>Save Profile</button>

            {isChangeUser && <div>The user has been modified</div>}
         
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfileDashboard;
