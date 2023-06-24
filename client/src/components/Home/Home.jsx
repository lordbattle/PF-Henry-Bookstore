import Card from "../Card/Card"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useState } from "react"
const Home = () => {
    const allBooks = useSelector(state=>state.books)
    console.log("ALLBOKS HOME", allBooks)
    const[currentPage, setCurrentPage]= useState(1)
    const recetasPorPag=20;
    const indexUltiJuego= currentPage * recetasPorPag;
    const indexPrimJuego= indexUltiJuego - recetasPorPag;
    const currentBooks = Array.isArray(allBooks) ? allBooks.slice(indexPrimJuego, indexUltiJuego) : [];

    return (
        <div className="d-flex flex-column">
            <Card currentBooks={currentBooks}></Card>
        </div>
    )
}

export default Home
