
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getBooks } from "../../redux/actions"
import Cards from "../Cards/Cards"
import style from '../Card/Card.module.css'
const Card = ({ currentBooks }) => {

  //LOCALSTORAGE PARA EL CARRITO
  const [cart, setCart]= useState([])

  useEffect(()=>{
    //almacena en el localstorage
    localStorage.setItem("cart", JSON.stringify(cart))
  })

  useEffect(()=>{
    ///LEE el carrito almacenado en localstorage
    const storedCart = localStorage.getItem("cart");
    if(storedCart){
      setCart(JSON.parse(storedCart))
    }
  }, [])

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
/////////////////////////////////

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  return (
    <div className={style.main}>
      {currentBooks.length > 0 ? (
        currentBooks.map((v) => {
          return (
            <Cards
              active={v.active}
              key={v.id}
              id={v.id}
              title={v.title}
              authors={v.authors}
              categories={v.genre}
              averageRating={v.averageRating}
              imageLinks={v.bookPic}
              price={v.price}
              stock={v.stock}
              addToCart={addToCart}
            // Otras propiedades de volumeInfo que desees utilizar
            />
          );
        })
      ) : (
        console.log("LOG DEL ERROR", currentBooks)
      )}
    </div>
  );

}

export default Card;
