import style from "./Dashboard.module.css";
import BookTable from "./componentDashboard/BookTable/BookTable";
import SalesTable from "./componentDashboard/SalesTable/SalesTable";
import UserTable from "./componentDashboard/userTable/UserTable";
import { useState } from "react";

const Dashboard = () => {
  const [book, setBook] = useState(false);
  const [user, setUser] = useState(true);
  const [sales, setSales] = useState(false);

  const handleTrueBook = () => {
    setUser(false);
    setSales(false);
    setBook(true);
  };

  const handleTrueSales = () => {
    setUser(false);
    setBook(false);
    setSales(true);
  };

  const handleTrueUser = () => {
    setSales(false);
    setBook(false);
    setUser(true);
  };

 /*  useEffect(() => {
    // Aquí no estás llamando a la función handleTrueBook, solo la estás pasando como referencia
    handleTrueBook();
  }, [book]); */

  return (
    <div className={style.container}>
      <div className={style.MenuAndContent}>
        <div className={style.dashboradMenu}>
          <div className={style.menu}>
            <h1>Dashboard</h1>
            <div className={style.divMenu} onClick={handleTrueUser}>
              <h2>Users</h2>
            </div>
            <div className={style.divMenu} onClick={handleTrueBook}>
              <h2>Books</h2>
            </div>
            <div className={style.divMenu} onClick={handleTrueSales}>
              <h2>Sales</h2>
            </div>
          </div>
          {user ? <UserTable /> : null}
          {book ? <BookTable /> : null}
          {sales ? <SalesTable /> : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
