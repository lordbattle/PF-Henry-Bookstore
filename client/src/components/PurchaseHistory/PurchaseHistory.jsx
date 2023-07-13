import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPurchaseHistoryById } from '../../redux/actions';
import ReviewStore from '../ReviewStore/components/ReviewStore/ReviewStore'
import style from '../PurchaseHistory/PurchaseHistory.module.css'
import { Link } from "react-router-dom";
export const PurchaseHistory = () =>{

    const dispatch = useDispatch();
    let userDataLocalPersistent =
    JSON.parse(localStorage.getItem("userDataLoginPersistent")) || null;
    const history = useSelector(state=>state.historyPurchase.results);
      let idUser=0;
      if (userDataLocalPersistent) {
        idUser = userDataLocalPersistent.id;
      }

    useEffect(()=>{dispatch(getPurchaseHistoryById(idUser))   
    },[idUser])
  
    console.log("data del estado global", history)   
    return (
      <div className={style.container}>
        <h3 style={{color: 'white', marginTop: '10px'}}>Purchase History</h3>
        {history && history.rows && history.rows.length > 0 ? (
          history.rows.map((row) => (
            <div key={row.id} className={style.product}>
              <h3>Bought the day: <span style={{textDecoration: 'underline'}}>{row.createdAt.split('T')[0]}</span></h3>
              <p style={{fontSize: '18px'}}>Order ID: {row.orderId}</p>
              <div className={style.purchase}>
              <p>Products: </p>
              {row.order && row.order.orderItems && row.order.orderItems.length > 0 ? (
                row.order.orderItems.map((orderItem) => (
                  <div key={orderItem.id}>
                    <div>
                      <Link to={`/detail/${orderItem.bookId}`} style={{textDecoration: 'none'}}><p>{orderItem.title}</p></Link>
                    </div>
                    <div>
                      <ReviewStore 
                        reviewStore={orderItem.reviewStore} 
                        bookId={orderItem.bookId}
                        userId={row.order.userId}
                        orderItemId={orderItem.id}/>
                    </div>
                  </div>
                ))
                
              ) : null}
              </div>
              <p style={{fontSize: '20px'}}>Total: ${row.order.total}</p> {/* Renderizar el total de la orden */}
            </div>
            
          ))
        ) : (
          <div className={style.empty}> 
              <img src='https://cdn-icons-png.flaticon.com/512/2037/2037300.png' alt='empty' width={'20%'}></img>
              <h3 style={{width: '100%', paddingTop: '1em'}}>You have no purchase history</h3>
              <Link to='/home' style={{width: '100%', paddingTop: '1em'}}><button className={style.btnAdd}>Buy</button></Link>
            </div>
        )}
      </div>
    ) 

}
export default PurchaseHistory