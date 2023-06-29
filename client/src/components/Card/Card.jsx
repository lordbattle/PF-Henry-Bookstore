
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getBooks } from "../../redux/actions"
import Cards from "../Cards/Cards"
import style from '../Card/Card.module.css'
const Card = ({ currentBooks }) => {

  //LOCALSTORAGE PARA EL CARRITO
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
/////////////////////////////////

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  return (
    <div className="d-flex justify-content-center">
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
    </div>
  );

}

export default Card;
