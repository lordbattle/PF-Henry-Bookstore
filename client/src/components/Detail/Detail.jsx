import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom"
import { getBookById, deleteBook } from "../../redux/actions";
import style from '../Detail/Detail.module.css'

const Detail = () =>{
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBookById(id))
    },[dispatch, id])

    const details = useSelector(state=> state.details);
    console.log("log del details", details);
    
    const {active, authors, averageRating, bookPic, description, genre, identifier, pages, publishedDate, publisher, subtitle, title, userRating, price} = details;
    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.detail}>
                <h2>ID DEL LIBRO: {id}</h2>
                <h4>{active===true? ( <button onClick={()=>{dispatch(deleteBook(id));}} className={style.deleteButtom}>Deshabilitar producto</button> ):(<button className={style.deleteButtom}>Habilitar producto</button>)}</h4>
                </div>

            <div className='d-flex p-3'>
            <img src={bookPic} alt="Imagen del libro" width='35%'/>
            <div className={style.advancedDetail}>
            <h1 style={{width: '100%',fontSize: '30px'}}>{title}</h1>
            <h2 style={{fontSize: '20px'}}>{subtitle}</h2>
            <p style={{fontSize: '20px'}}>Price: ${price}</p>
            <p style={{fontSize: '20px'}}>Author's: {authors}</p>
            <p style={{fontSize: '18px', maxHeight: '60%'}}>{description}</p>
            <p style={{width: '50%', fontSize: '20px'}}>Rating global: {averageRating}</p> <p style={{width: '50%', fontSize: '20px'}}>Rating de usuarios: {userRating}</p>
            <p style={{width: '33.3%', fontSize: '18px'}}>Categories: {genre}</p>
            <p style={{width: '33.3%', fontSize: '18px'}}>Pages: {pages}</p>
            <p style={{width: '33.3%', fontSize: '18px'}}>{publisher} : {publishedDate}</p>
            <p style={{fontSize: '20px'}}>{identifier}</p>
            
            </div>
            </div>
            <Link to="/home" style={{textDecoration: 'none'}}><p className={style.back}>Go back</p></Link>
            </div>
        </div>
    )
}
export default Detail;