
import localStorage from '../LocalStorage/LocalStorage'

export const Cart =()=>{
const {cart} = localStorage();

    console.log("ENTRE AL LOCALSTORAGE POR CART", cart)

    return(
        <div>
            <h1>CART</h1>
        </div>
    )
}
export default Cart;