
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getBooks } from "../../redux/actions"
import Cards from "../Cards/Cards"
import style from '../Card/Card.module.css'
const Card = ({ currentBooks }) => {

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
