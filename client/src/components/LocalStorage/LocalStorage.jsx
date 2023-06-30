import { useState, useEffect } from "react";

export const useStorage = () =>{

    const [cart, setCart]= useState(()=>{
        try {
          //lee el localStorage si tuviese info, sino array vacio
          const storedCart = localStorage.getItem("cart");
          return storedCart ? JSON.parse(storedCart) : []
       }
        catch (error) {
         console.log(`ERROR DEL getItem de storedCart ${error}`);
         return [];
       }
      })
    
      useEffect(()=>{
        //almacena en el localstorage
        localStorage.setItem("cart", JSON.stringify(cart))
      },[cart])
    
    
      const addToCart = (newItem)=>{
        const existingItem = cart.find((item)=> item.id === newItem.id);
        if(existingItem){
        const updatedCart = cart.map((item)=>{
          if(item.id === newItem.id){
            return {
              ...item,
              stock: item.stock + 1,
            }
          }
          return item
        })
          setCart(updatedCart);
      } else {
        setCart([...cart, newItem]);
      }
    }
    return {cart, addToCart, setCart}
}
export default useStorage;