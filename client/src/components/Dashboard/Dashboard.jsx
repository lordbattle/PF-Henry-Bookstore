import style from "./Dashboard.module.css";
import BookTable from "./componentDashboard/BookTable";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const [book, setBook] = useState(false);
  const handleTrueBook = (e) => {
    if (book === false)
      setBook(true);
    else
      setBook(false)

    console.log(book, ' cambio book estado ')
  }
  useEffect(() => {
    handleTrueBook
  }, [book]);
  return (
    <div className={style.container}>
      <h1>Dashboard</h1>
      <div className={style.MenuAndContent}>
        <div className={style.dashboradMenu}>
          <div className={style.menu}>
            <div ><h2>Usuarios</h2></div>
            <div onClick={handleTrueBook}><h2>Books</h2></div>
            <div><h2>Ventas</h2></div>


          </div>

          {/* <ul className={style.user_list}>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul> */}
        </div>
        {
          book ? <BookTable /> : <></>
        }
      </div>


    </div>
  );
};

export default Dashboard;
