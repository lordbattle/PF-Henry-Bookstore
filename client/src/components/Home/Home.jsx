import Footer from "../Footer/Footer"
import Cards from "../Cards/Cards"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useState } from "react"
const Home = () => {
    const allRecipes = useSelector(state=>state.books)
    const[currentPage, setCurrentPage]= useState(1)
    const recetasPorPag=9;
    const indexUltiJuego= currentPage * recetasPorPag;
    const indexPrimJuego= indexUltiJuego - recetasPorPag;
    const currentRecipes= allRecipes.slice(indexPrimJuego, indexUltiJuego)
    return (
        <div className="d-flex flex-column">
            <h1>Home</h1>
            <Cards currentRecipes={currentRecipes}></Cards>
            <Footer />
        </div>
    )
}

export default Home