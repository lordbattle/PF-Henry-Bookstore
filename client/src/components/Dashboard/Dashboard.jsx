import style from "./Dashboard.module.css";
import BookTable from "./componentDashboard/BookTable/BookTable";
import UserTable from "./componentDashboard/userTable/UserTable";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [book, setBook] = useState(false);
  const [user, setUser] = useState(true);



  const handleTrueBook = (e) => {
    if (book === false) {
      setUser(false);
      setBook(true);
      preventDefault();
    }
    else
      setBook(false)
      setUser(true);

  }

  const handleTrueUser = (e) => {
    if (user === false) {
      setBook(false);
      setUser(true);
    }
    else {
      setUser(true);
    }
  }
  useEffect(() => {
    handleTrueBook
  }, [book]);
  return (
    <div className={style.container}>
      <div className={style.MenuAndContent}>

        <div className={style.dashboradMenu}>

          <div className={style.menu}>
            <h1>Dashboard</h1>
            <div onClick={handleTrueUser} ><h2>Usuarios</h2></div>
            <div onClick={handleTrueBook}><h2>Books</h2></div>
            <div><h2>Ventas</h2></div>


          </div>

          {/* <ul className={style.user_list}>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul> */}
          {user ? <UserTable /> : <></>}
        </div>
        {
          book ? <BookTable /> : <></>
        }
      </div>


    </div>
  );
};

export default Dashboard;
