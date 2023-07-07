import { useSelector } from "react-redux";
import set from "./Filters.module.css";

const Filters = (props) => {
  const { books } = useSelector((state) => state.books);

  const { setFilters } = props;

  //sirve para cargar el la copia del array y despues desmotar el aray original.

  const handleChangeGenre = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      genre: e.target.value,
    }));
  };

  const btnReset = (e) => {
    e.preventDefault();
    setFilters({
      price: 0,
      genre: "all",
      author: "all",
      limit: 10,
      orderPrice: "neu",
      orderTitle: "neu",
    });
  };

  const handleChangeAuthors = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      author: e.target.value,
    }));
  };

  const handleChangeOrderTitle = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      orderTitle: e.target.value,
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

    return resultado;
  }

  const newArrayGenres = propertiesGenres(books);

  const newArrayAuthors = propertiesAuthors(books);

  return (
    <section
      style={{ background: "#7097d1" }}
      className="d-flex flex-column align-items-center h-25 py-3"
    >
      <div className="d-flex gap-2 align-items-center">
        <button className="btn bg-success py-1 px-2" onClick={btnReset}>
          Reset
        </button>
      </div>
      <div className="d-flex gap-2 flex-column">
        <section id="title" className="py-1 px-2 ">
          <label className="text-white fs-5">Authors</label>
          <div className={set.hover_options}>
            {" "}
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1"
              onClick={(e) => handleChangeAuthors(e)}
              value="all"
            >
              ALL
            </option>
            {newArrayAuthors?.map((item) => (
              <option
                key={item.id}
                onClick={(e) => handleChangeAuthors(e)}
                className="text-white border-bottom border-white border-opacity-50 py-1"
                value={item.author
                  .trim()
                  .split(" ")
                  .slice(0, 2)
                  .filter((char) => char !== ".")
                  .join(" ")
                  .toLowerCase()}
              >
                {item.author.toUpperCase()}
              </option>
            ))}
          </div>
        </section>
      </div>
      <div className="d-flex gap-2 align-items-center my-3 ">
        <section className="py-1 px-2">
          <label className="text-white fs-5">Price</label>
          <div className={set.hover_options}>
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1"
              value={0}
              onClick={(e) => handleChangePrice(e)}
            >
              Everything
            </option>
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1"
              value={1}
              onClick={(e) => handleChangePrice(e)}
            >
              Hasta $500
            </option>
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1"
              value={2}
              onClick={(e) => handleChangePrice(e)}
            >
              $500 - $5,000
            </option>
            <option
              className="text-white py-1"
              value={3}
              onClick={(e) => handleChangePrice(e)}
            >
              Mas de $5,000
            </option>
          </div>
        </section>
      </div>
      <div className="d-flex gap-2 align-items-center my-3">
        <section id="genre" className="py-1 px-2">
          <label className="text-white fs-5">Genre</label>
          <div className={set.hover_options}>
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1"
              value="all"
            >
              ALL
            </option>
            {newArrayGenres &&
              newArrayGenres?.map((obj) => {
                return (
                  <option
                    key={obj.id}
                    onClick={(e) => handleChangeGenre(e)}
                    value={obj.genre}
                    className="text-white border-bottom border-white border-opacity-50 py-1 "
                  >
                    {obj.genre}
                  </option>
                );
              })}
          </div>
        </section>
      </div>{" "}
      <div className="d-flex gap-2 align-items-center">
        <section className="py-1 px-2">
          {" "}
          <label className="text-white fs-5">Order Title</label>
          <div className={set.hover_options}>
            <option
              onClick={(e) => handleChangeOrderTitle(e)}
              value="asc"
              className="text-white border-bottom border-white border-opacity-50 py-1 "
            >
              A-Z
            </option>
            <option
              onClick={(e) => handleChangeOrderTitle(e)}
              value="desc"
              className="text-white border-bottom border-white border-opacity-50 py-1 "
            >
              Z-A
            </option>
          </div>
        </section>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <section id="Oprice" className="py-1 px-2">
          <label className="text-white fs-5">Order Price</label>
          <div className={set.hover_options}>
            {" "}
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1 "
              onClick={(e) => handleChangeOrderTitle(e)}
              value="asc"
            >
              Ascendente
            </option>
            <option
              className="text-white border-bottom border-white border-opacity-50 py-1 "
              onClick={(e) => handleChangeOrderTitle(e)}
              value="desc"
            >
              Desendente
            </option>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Filters;
