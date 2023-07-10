import style from "./Dashboard.module.css";
import BookTable from "./componentDashboard/BookTable/BookTable";
import UserTable from "./componentDashboard/userTable/UserTable";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [book, setBook] = useState(false);
  const [user, setUser] = useState(true);
  const [sales, setSales] = useState(false);




  const handleTrueBook = (e) => {
    if (book === false) {
      setUser(false);
      setSales(false)
      setBook(true);
      preventDefault();
    }
    else
    setSales(false)
    setBook(false)
    setUser(true);

  }
  const handleTrueSales = (e) => {
    if (sales === false) {
      setUser(false);
      setBook(false);
      setSales(true)
      preventDefault();
    }
    else
      setBook(false)
    setSales(false)
    setUser(true);

  }

  const handleTrueUser = (e) => {
    if (user === false) {
      setSales(false)
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
            <div className={style.divMenu} onClick={handleTrueUser} ><h2>Users</h2></div>
            <div className={style.divMenu} onClick={handleTrueBook}><h2>Books</h2></div>
            <div className={style.divMenu} onClick={handleTrueSales}><h2>Sales</h2></div>
          </div>
          {user ? <UserTable /> : <></>}
          {book ? <BookTable /> : <></>}


        </div>

      </div>


    </div>
  );
};

export default Dashboard;
