import localStorage from '../LocalStorage/LocalStorage'
import { buyBook } from '../../redux/actions';
import {initMercadoPago, Wallet} from "@mercadopago/sdk-react"
import { useState } from 'react';
import {useParams} from "react-router-dom"
import Swal from "sweetalert2"
import style from "../Cart/Cart.module.css"
import "./Cart.module.css"


export const Cart =()=>{
const {cart, addToCart, setCart} = localStorage();

    const handleIncreseAmount = (itemId)=>{
        const updateCart = cart.map((item)=>{
            if(item.id === itemId){
                if(item.stock < 10){
                     return{
                    ...item,
                    stock: item.stock + 1,
                }
              }    
            }
            return item;
        })
        setCart(updateCart)
    }

    const handleDecreaseAmount = (itemId) =>{
        const updateCart = cart.map((item)=>{
            if(item.id === itemId){
                if(item.stock === 0){
                    return item;
                }
                return{
                    ...item,
                    stock: item.stock - 1,
                }
            }
            return item;
        })
        setCart(updateCart)
    }

    const handleRemoveItem = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
      };
      ///////TOTAL TO PAY//////
      let totalCart = 0;
      cart.forEach((item)=>{
        totalCart += item.price * item.stock;
      })

///mercadoPago
    const [Id, setId]=useState(null);
    const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
    initMercadoPago(publicKey)

    const handleBuy = async () => {
      try {
        console.log("HandleBuy clickeado");
        const id_user = 1; 
        const items = cart.map((item) => ({
          id: item.id,
          quantity: item.stock,
        }));


        const product = {
          id_user: id_user,
          items: items,

        };

        const id = await buyBook(product)();
        if (id) {
          setId(id);
        }
      } catch (error) {
        console.log(`error del catch buyproduch ${error}`);
      }
    };

    const {status} = useParams();
    if(status === 'success'){
        Swal.fire({
          title: "Exit!",
          text: "Purchase successfully",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {container: 'fade-backgroundSuccess'}
        });
    }else if (status === 'failure'){
      Swal.fire({
        title: "Failed",
        text: "Failed purchase",
        icon: 'error',
       denyButtonText: "Retry",
       customClass: {container: 'fade-backgroundFailure'}
      });
    }else if (status === 'pending'){
      Swal.fire({
        title: "Pending",
        text: "Something went wrong",
        icon: 'warning',
       denyButtonText: "Retry",
       customClass: {container: 'fade-backgroundFailure'}
      });
    }



    return(
        <div>
      {cart.length > 0 ? (
       <div>
          {cart.map((item) => (
            <div key={item.id} className={style.main}>
              <div style={{display: 'flex'}}>
                    <img src={item.img} alt="book image" style={{height: '11rem', width: '10rem',marginRight: '1rem'}}/>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      <p>ID del producto: {item.id}</p>
                      <p>{item.title}</p>
                      <p>${item.price}</p>
                    </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around', minWidth: '20rem', height: '2.5rem',backgroundColor: '#71a5e5', borderRadius: '8px', paddingTop: '3px'}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <button onClick={() => handleDecreaseAmount(item.id)} className={style.decrease}>-</button>
                      <p style={{fontSize: '20px', marginLeft: '5px', marginRight: '5px'}}>Amount: {item.stock}</p>
                      <button onClick={() => handleIncreseAmount(item.id)} className={style.increase}>+</button>
                    </div>
                    <span className={style.delete} onClick={() => handleRemoveItem(item.id)}>❌Delet product❌</span>
                    </div>
            </div>
          ))}

          <span style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minWidth: '100%', textAlign: 'center'}}>
            <p style={{fontSize: '20px'}}>Total: ${totalCart}</p> 
            <button onClick={handleBuy} className={style.btn}>Buy</button>
          </span>
          {Id && <Wallet initialization={{preferenceId: Id}}/>}
        </div>
      ) : (
        <p key="No books">No hay elementos en el carrito.</p>
      )}
        </div>
    )
}
export default Cart;