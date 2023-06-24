import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom"
import { getBookById, deleteBook } from "../../redux/actions";

const Detail = () =>{
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBookById(id))
    },[dispatch, id])

    const details = useSelector(state=> state.details);
    console.log("log del details", details);
    
    const {active, authors, averageRating, bookPic, description, genre, identifier, pages, publishedDate, publisher, subtitle, title, userRating} = details;
    return (
        <div>
            <p>ID DEL LIBRO: {id}</p>
            <p>{active}</p>
            <p>{title}</p>
            <p>{subtitle}</p>
            <img src={bookPic} alt="Imagen del libro" />
            <p>Author's: {authors}</p>
            <p>{description}</p>
            <p>Rating global: {averageRating}</p> <p>Rating de usuarios: {userRating}</p>
            <p></p>
            <p>Categories: {genre}</p>
            <p>Pages: {pages}</p>
            <p>{publisher}</p><p>{publishedDate}</p>
            <p>{identifier}</p>
            <Link to="/home">Go back</Link>

        </div>
    )
}
export default Detail;