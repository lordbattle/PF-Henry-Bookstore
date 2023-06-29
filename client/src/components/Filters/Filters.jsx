import { useSelector } from "react-redux";

const Filters = (props) => {
  const { books } = useSelector((state) => state);
  const dataCopy = books.slice();
  const { setFilters } = props;

  //sirve para cargar el la copia del array y despues desmotar el aray original.

  const handleChangeGenre = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      genre: e.target.value,
    }));
  };

  const handleChangeAuthors = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      author: e.target.value,
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

  // ESTO ES LO QUE SE FILTRARA http://localhost:3001/books/?title=&author=&genre=&page=1&limit=10&orderPrice=desc&orderTitle=desc

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

  function propertiesAuthors(array) {
    const resultado = [];

    array.forEach((objeto) => {
      const { authors } = objeto;

      if (
        authors &&
        !resultado.some(
          (item) =>
            item.author ===
            authors
              .trim()
              .split(" ")
              .slice(0, 2)
              .filter((char) => char !== ".")
              .join(" ")
        )
      ) {
        resultado.push({
          id: objeto.id,
          author: authors.trim().split(" ").slice(0, 2).join(" "),
        });
      }
    });
    console.log("array authors ", resultado);
    return resultado;
  }

  const newArrayGenres = propertiesGenres(dataCopy);

  const newArrayAuthors = propertiesAuthors(dataCopy);

  return (
    <section className="d-flex justify-content-evenly py-3">
      <div className="d-flex gap-2 align-items-center">
        <label htmlFor="title">Order Title</label>
        <select
          id="title"
          className="bg-dark py-1 px-2"
          onChange={handleChangeRating}
        >
          <option value="0">ALL</option>
          <option value="asc">Mayor a Menor</option>
          <option value="desc">Menor a Mayor</option>
        </select>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <label htmlFor="price">Order Price</label>
        <select
          id="price"
          name="price"
          className="bg-dark py-1 px-2"
          onChange={handleChangePrice}
        >
          <option value={0}>ALL</option>

          <option value="asc">Ascendente</option>
          <option value="desc">Desendente</option>
        </select>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <label htmlFor="title">Authors</label>
        <select
          id="title"
          className="bg-dark py-1 px-2"
          onChange={handleChangeAuthors}
        >
          <option value="all">ALL</option>
          {newArrayAuthors?.map((item) => (
            <option key={item.id} value={item.author}>
              {item.author.toUpperCase()}
            </option>
          ))}
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
            newArrayGenres?.map((obj) => {
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
