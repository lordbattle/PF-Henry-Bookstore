import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPurchaseHistoryById } from '../../redux/actions';
export const PurchaseHistory = () =>{

    const dispatch = useDispatch();
    const user = useSelector(state=>state.user)
    const history = useSelector(state=>state.historyPurchase.results);

      let idUser=0;
        if(user){
          idUser = user.id
        }
         console.log("ESTO ES ID DE USER", idUser)

     useEffect(()=>{dispatch(getPurchaseHistoryById(idUser))   
     },[idUser])
   
     console.log("data del estado global", history)   

     return (
      <div>
        <h3>Historial de compras</h3>
        {history && history.rows && history.rows.length > 0 ? (
          history.rows.map((row) => (
            <div key={row.id}>
              <h3>bought the day: {row.createdAt}</h3>
              <p>Order ID: {row.orderId}</p>
              <p>Total: ${row.order.total}</p> {/* Renderizar el total de la orden */}
    
              {row.order && row.order.orderItems && row.order.orderItems.length > 0 ? (
                row.order.orderItems.map((orderItem) => (
                  <div key={orderItem.id}>
                    <p>{orderItem.title}</p>
                    <p>Price: ${orderItem.unit_price}</p>
                  </div>
                ))
              ) : null}
            </div>
          ))
        ) : (
          <div>
            <p>Aqui se renderizará el historial de sus compras</p>
          </div>
        )}
      </div>
    ) 

}
export default PurchaseHistory