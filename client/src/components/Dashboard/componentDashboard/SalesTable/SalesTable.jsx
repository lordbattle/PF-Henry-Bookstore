import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../../../redux/actions'
import style from "./SalesTable.module.css"


const SalesTable = () => {
        const dispatch = useDispatch()

       const orders = useSelector(state => state.orders)

       let arrayOrders = orders.rows;
    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

  return (
    <>
    <div className={style.containerOrders}>
        <h3>Orders</h3>

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
                    <td>{order.id}</td>
                    <td>${order.total}.00</td>
                    <td className='text-uppercase'>{order.status}</td>
                    <td>{order.userId}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{order.dueDate.split('T')[0]}</td>
                    <td className='text-uppercase'>{order.invoiceStatus.split('_').join(" ")}</td>
                 
                  </tr>
                )
              )}
            </tbody>
          </table>
    </div>
    
    </>
  )
}

export default SalesTable