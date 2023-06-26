import React, { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import Filters from "../Filters/Filters";
import useFilters from "../../hooks/useFilters";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";

const Home = () => {
  const allBooks = useSelector((state) => state.books);
  const { setFilters, filtersBooks } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const recetasPorPag = 20;

  const booksFilters = filtersBooks(allBooks);
  const indexUltiJuego = currentPage * recetasPorPag;
  const indexPrimJuego = indexUltiJuego - recetasPorPag;
  const currentBooks = Array.isArray(booksFilters)
    ? booksFilters.slice(indexPrimJuego, indexUltiJuego)
    : [];

  return (
    <div className="d-flex flex-column">
      <Filters setFilters={setFilters} />
      <Card currentBooks={currentBooks} />
      <div className="d-flex justify-content-center p-2">
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(booksFilters.length / recetasPorPag)}
        onPageChange={setCurrentPage}
      />
      </div>
      <Footer />
    </div>
  );
};

export default Home;




















// //import Footer from "../Footer/Footer"
// import Card from "../Card/Card";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useState } from "react";
// import Filters from "../Filters/Filters";
// import useFilters from "../../hooks/useFilters";
// import Footer from "../Footer/Footer";
// import Pagination from "../Pagination/Pagination";


// const Home = () => {
//   const allBooks = useSelector((state) => state.books);

//   //no borrar esta linea porfavor
//   const { setFilters, filtersBooks } = useFilters();

//   // console.log("ALLBOKS HOME", allBooks);

//   let booksFilters = filtersBooks(allBooks);

//   console.log("libros filtrados",booksFilters);

//   const [currentPage] = useState(1);
//   const recetasPorPag = 20;
//   const indexUltiJuego = currentPage * recetasPorPag;
//   const indexPrimJuego = indexUltiJuego - recetasPorPag;
//   const currentBooks = Array.isArray(booksFilters)
//     ? booksFilters.slice(indexPrimJuego, indexUltiJuego)
//     : [];

//   console.log("Filtersbooks", currentBooks);
//   return (
//     <div className="d-flex flex-column ">
//       <Filters setFilters={setFilters} />

//       <Card currentBooks={currentBooks}></Card>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
