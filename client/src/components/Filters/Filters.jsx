import { useSelector } from "react-redux";

const Filters = (props) => {
  const { books } = useSelector((state) => state);

  const { setFilters } = props;
  const handleChangeGenre = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      genre: e.target.value,
    }));
  };

  const handleChangeRating = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      rating: e.target.value,
    }));
  };

  const handleChangePrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      price: e.target.value,
    }));
  };

  function propertiesGenres(array) {
    const resultado = [];

    array.forEach((objeto) => {
      const { genre } = objeto;

      if (
        genre &&
        !resultado.some((item) => item.genre === genre.toLowerCase())
      ) {
        resultado.push({
          id: objeto.id,
          genre: genre.toLowerCase(),
        });
      }
    });

    return resultado;
  }

  const newArrayGenres = propertiesGenres(books);

  return (
    <section className="d-flex justify-content-evenly py-3">
      <div className="d-flex gap-2 align-items-center">
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          name="rating"
          className="bg-dark py-1 px-2"
          onChange={handleChangeRating}
        >
          <option value="all">ALL</option>
          <option value="Mayor">Mayor a Menor</option>
          <option value="Menor">Menor a Mayor</option>
        </select>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <label htmlFor="price">Price</label>
        <select
          id="price"
          name="price"
          className="bg-dark py-1 px-2"
          onChange={handleChangePrice}
        >
          <option value="all">ALL</option>
          <option value="Mayor">Mayor P. a Menor P.</option>
          <option value="Menor">Menor P. a Mayor P.</option>
        </select>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          className="bg-dark py-1 px-2"
          onChange={handleChangeGenre}
        >
          <option value="all">ALL</option>
          {newArrayGenres &&
            newArrayGenres.map((obj) => {
              return (
                <option key={obj.id} value={obj.genre}>
                  {obj.genre.toUpperCase()}
                </option>
              );
            })}
        </select>
      </div>
    </section>
  );
};

export default Filters;
