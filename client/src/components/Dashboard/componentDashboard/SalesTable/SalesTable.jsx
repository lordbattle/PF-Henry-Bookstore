import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../redux/actions";
import style from "./SalesTable.module.css";
import { getOrdersByStatus } from '../../../../redux/actions'

const SalesTable = () => {
  let orderStatus = (order) => {
    switch (order) {
      case "approved":
        return (
          <span
            style={{
              backgroundColor: "#00C851",
              color: "white",
              borderRadius: "5px",
              padding: "0px 15px",
            }}
          >
            APPROVED
          </span>
        );

      case "pending":
        return (
          <span
            style={{
              backgroundColor: "#33b5e5",
              color: "white",
              borderRadius: "5px",
              padding: "0px 15px",
            }}
          >
            PENDING
          </span>
        );

      case "reject":
        return (
          <span
            style={{
              backgroundColor: "#ff4444",
              color: "white",
              borderRadius: "5px",
              padding: "0px 15px",
            }}
          >
            REJECT
          </span>
        );

      default:
        break;
    }
  };
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

  let arrayOrders = orders.rows;
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  function handleFilterByStatus(event){
    event.preventDefault()
    dispatch(getOrdersByStatus(event.target.value))
}

  return (
    <>
      <div className={style.containerOrders}>
        <h3>Sales</h3>
        <div className="d-flex">
        <div className={style.filters}>
                <select defaultValue='Filter by status' onChange={event => handleFilterByStatus(event)}>
                    <option disabled>Filter by status</option>
                    <option key='approved' value='approved'>APPROVED</option>
                    <option key='pending' value='pending'>PENDING</option>
                    <option key='reject' value='reject'>REJECT</option>
                </select>
        </div>

        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>UserId</th>
              <th>OrderItems</th>
              <th>Payday</th>
              <th>Invoice Status</th>
            </tr>
          </thead>
          <tbody>
            {arrayOrders?.map((order) => (
              <tr key={order.id}>
                <td className={style.td}>{order.id}</td>
                <td className={style.td}>${order.total}.00</td>
                <td className={style.td}>{orderStatus(order.status)}</td>
                <td className={style.td}>{order.userId}</td>
                <td className={style.td}>{order.orderItems.length}</td>
                <td className={style.td}>{order.dueDate.split("T")[0]}</td>
                <td className={style.td}>
                  {order.invoiceStatus.split("_").join(" ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default SalesTable;
