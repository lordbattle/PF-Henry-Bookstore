
/* import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getBooks } from "../../redux/actions" */
import Cards from "../Cards/Cards"
import style from '../Card/Card.module.css'
import useStorage from "../LocalStorage/LocalStorage"

const Card = ({ currentBooks }) => {

  const { addToCart} = useStorage();

  /* const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch]) */

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
