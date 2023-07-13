import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../redux/actions";
import style from "./SalesTable.module.css";
import { updateOrderStatus } from "../../../../redux/actions";
import useSalesFilters from "../../../../hooks/useSalesFilters";

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

  const { statusFilter, setStatusFilter, filterByStatus } = useSalesFilters();

  const handleFilterByStatus = (e) => {
    setStatusFilter({
      ...statusFilter,
      statusFil: e.target.value,
    });
  };

  const newArray = filterByStatus(arrayOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleChangeStatus = async (e, id) => {
    e.preventDefault();
    const newStatus = {
      status: e.target.value,
    };

    await dispatch(updateOrderStatus(id, newStatus));

    setTimeout(() => {
      dispatch(getAllOrders());
    }, 700);
  };

  return (
    <>
      <div className={style.containerOrders}>
        <h3>Sales</h3>{" "}
        <div className={style.filters}>
          <select
            value={statusFilter.statusFil}
            onChange={handleFilterByStatus}
          >
            <option value="all">Filter by status</option>
            <option value="approved">APPROVED</option>
            <option value="pending">PENDING</option>
            <option value="reject">REJECT</option>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newArray?.map((order) => (
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
                <td className={style.btnStatus}>
                  <select onChange={(e) => handleChangeStatus(e, order.id)}>
                    <option value="not">Change Value</option>
                    <option value="approved">APPROVED</option>
                    <option value="pending">PENDING</option>
                    <option value="reject">REJECT</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SalesTable;
