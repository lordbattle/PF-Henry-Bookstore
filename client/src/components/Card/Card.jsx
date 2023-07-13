import Cards from "../Cards/Cards";

import useStorage from "../LocalStorage/LocalStorage";

const Card = ({ currentBooks }) => {
  const { addToCart } = useStorage();

  return (
    <div className="d-flex justify-content-center flex-column w-100 h-100 border border-black px-2">
      {currentBooks ? (
        currentBooks.map((v) => {
          return (
            <Cards
              active={v.active}
              key={v.id}
              id={v.id}
              title={v.title}
              author={v.authors}
              categories={v.genre}
              averageRating={v.averageRating}
              imageLinks={v.bookPic}
              price={v.price}
              stock={v.stock}
              addToCart={addToCart}
            />
          );
        })
      ) : (
        <p>No se encuentran libros</p>
      )}
    </div>
  );
};

export default Card;
