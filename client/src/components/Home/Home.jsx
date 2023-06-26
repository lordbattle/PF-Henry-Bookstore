//import Footer from "../Footer/Footer"
import Card from "../Card/Card";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import Filters from "../Filters/Filters";
import useFilters from "../../hooks/useFilters";

const Home = () => {
  const allBooks = useSelector((state) => state.books);

  //no borrar esta linea porfavor
  const { setFilters, filtersBooks } = useFilters();

  // console.log("ALLBOKS HOME", allBooks);

  let booksFilters = filtersBooks(allBooks);

  console.log("libros filtrados",booksFilters);

  const [currentPage] = useState(1);
  const recetasPorPag = 20;
  const indexUltiJuego = currentPage * recetasPorPag;
  const indexPrimJuego = indexUltiJuego - recetasPorPag;
  const currentBooks = Array.isArray(booksFilters)
    ? booksFilters.slice(indexPrimJuego, indexUltiJuego)
    : [];

  console.log("Filtersbooks", currentBooks);
  return (
    <div className="d-flex flex-column">
      <Filters setFilters={setFilters} />

      <Card currentBooks={currentBooks}></Card>
    </div>
  );
};

export default Home;
