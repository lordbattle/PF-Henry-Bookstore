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
      <div className={style.menu}>
        <div className={style.positionFixed}>
          <h1 className="border-bottom border-secondary-subtle bg-white">Dashboard</h1>
          <div className={style.divMenu} onClick={handleTrueUser}>
            <h4>Users</h4>
          </div>
          <div className={style.divMenu} onClick={handleTrueBook}>
            <h4>Books</h4>
          </div>
          <div className={style.divMenu} onClick={handleTrueSales}>
            <h4>Sales</h4>
          </div>
        </div>
      </div>
      {user ? <UserTable /> : null}
      {book ? <BookTable /> : null}
      {sales ? <SalesTable /> : null}
    </div>
  );
};

export default Dashboard;
