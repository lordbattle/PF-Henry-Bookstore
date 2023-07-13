import style from "./Dashboard.module.css";
import BookTable from "./componentDashboard/BookTable/BookTable";
import SalesTable from "./componentDashboard/SalesTable/SalesTable";
import UserTable from "./componentDashboard/userTable/UserTable";
import { useState } from "react";
import boxicons from "boxicons"

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
          <h2>Dashboard</h2>
          <div className={style.divMenu} onClick={handleTrueUser}>
          <box-icon name='user' ></box-icon><span style={{fontSize: '24px'}}>Users</span>
          </div>
          <div className={style.divMenu} onClick={handleTrueBook}>
          <box-icon name='book-bookmark' ></box-icon><span style={{fontSize: '24px'}}>Books</span>
          </div>
          <div className={style.divMenu} onClick={handleTrueSales}>
          <box-icon name='credit-card' type='solid' ></box-icon><span style={{fontSize: '24px'}}>Sales</span>
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
