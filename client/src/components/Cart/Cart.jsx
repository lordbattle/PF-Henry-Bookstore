
import localStorage from '../LocalStorage/LocalStorage'

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
      let total = 0;
      cart.forEach((item)=>{
        total += item.price * item.stock;
      })
    return(
        <div>
      {cart.length > 0 ? (
       <div>
          {cart.map((item) => (
            <div key={item.id}>
                    <p>ID del producto: {item.id}</p>
                    <img src={item.img} alt="book image" />
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <button onClick={() => handleDecreaseAmount(item.id)}>-</button>
                    <p>Amount: {item.stock}</p>
                    <button onClick={() => handleIncreseAmount(item.id)}>+</button>
                    <span onClick={() => handleRemoveItem(item.id)}>❌Delet product❌</span>
            </div>
          ))}
          <p>Total: ${total}</p>
        </div>
      ) : (
        <p key="No books">No hay elementos en el carrito.</p>
      )}
        </div>
    )
}
export default Cart;