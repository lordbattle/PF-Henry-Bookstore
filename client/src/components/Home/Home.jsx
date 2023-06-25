//import Footer from "../Footer/Footer"
import Card from "../Card/Card";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
//import useFilters from "../../hooks/useFilters";

const Home = () => {
  const allBooks = useSelector((state) => state.books);
  
  //no borrar esta linea porfavor
  //const {setFilters, filtersBooks} = useFilters()

  console.log("ALLBOKS HOME", allBooks);
  const [currentPage] = useState(1);
  const recetasPorPag = 20;
  const indexUltiJuego = currentPage * recetasPorPag;
  const indexPrimJuego = indexUltiJuego - recetasPorPag;
  const currentBooks = Array.isArray(allBooks)
    ? allBooks.slice(indexPrimJuego, indexUltiJuego)
    : [];

  return (
    <div className="d-flex flex-column p-1">
      <Card currentBooks={currentBooks}></Card>
    </div>
  );
};

export default Home;
