import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom"
import { getBookById, deleteBook, activeBook, editBook } from "../../redux/actions";
import style from '../Detail/Detail.module.css'

const Detail = () =>{
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBookById(id))
    },[dispatch, id])

    const details = useSelector(state=> state.details);
    console.log("log del details", details);
    
    const {active, authors, averageRating, bookPic, description, genre, identifier, pages, publishedDate, publisher, subtitle, title, userRating, price, stock} = details;
   
    const [editedProduct, setEditedProduct]=useState({
        title: '',
        subtitle: '',
        price: 0,
        stock: 0,
        authors: '',
        description: '',
        bookPic: '',
        averageRating: 0,
        genre: '',
        pages: 0,
        publishedDate: '',
        publisher: '',
        identifier: '',

    })

    const [isEditing, setIsEditing]=useState(false)
    const handleInputChange = (e)=>{

        const {name, value} = e.target;
        setEditedProduct({...editedProduct, [name]: value})
    }

    const handleEditProduct=(e)=>{
        e.preventDefault();
        dispatch(editBook(id, editedProduct));
        setIsEditing(false)
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.detail}>
                <h2>ID DEL LIBRO: {id}</h2>
                <h4>{active===true? ( <button onClick={()=>{dispatch(deleteBook(id));}} className={style.deleteButtom}>Deshabilitar producto</button> ):(<button onClick={()=>(dispatch(activeBook(id)))} className={style.deleteButtom}>Habilitar producto</button>)}</h4>
                <h4><button onClick={()=>setEditedProduct(true)} className={style.deleteButtom}>Edit product</button></h4>
                </div>

            <div className='d-flex p-3'>
            <img src={bookPic} alt="Imagen del libro" width='35%'/>
            <div className={style.advancedDetail}>
            <input
            placeholder="TITLE"
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
            />
            <input
            placeholder="SUBTITLE"
                type="text"
                name="subtitle"
                value={editedProduct.subtitle}
                onChange={handleInputChange}
            />
            <input
            placeholder="PRICE"
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
            />
            <input
            placeholder="STOCK"
                type="number"
                name="stock"
                value={editedProduct.stock}
                onChange={handleInputChange}
            />
            <input
            placeholder="AUTHOR'S"
                type="text"
                name="authors"
                value={editedProduct.authors}
                onChange={handleInputChange}
            />
            <input
            placeholder="GENRES"
                type="text"
                name="genre"
                value={editedProduct.genre}
                onChange={handleInputChange}
            />
            <input
            placeholder="IDENTIFIER"
                type="text"
                name="identifier"
                value={editedProduct.identifier}
                onChange={handleInputChange}
            />
            <input
            placeholder="PUBLISHER"
                type="text"
                name="publisher"
                value={editedProduct.publisher}
                onChange={handleInputChange}
            />
            <input
            placeholder="PUBLISHED DATE"
                type="text"
                name="publishedDate"
                value={editedProduct.publishedDate}
                onChange={handleInputChange}
            />
            <textarea
            placeholder="DESCRIPTION"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
            />
            <h1 style={{width: '100%',fontSize: '30px'}}>{title}</h1>
            <h2 style={{fontSize: '20px'}}>{subtitle}</h2>
            <p style={{fontSize: '20px'}}>Price: ${price}</p>
            <p style={{fontSize: '20px'}}>Stock: {stock}</p>
            <p style={{fontSize: '20px'}}>Author's: {authors}</p>
            <p style={{fontSize: '18px', maxHeight: '60%'}}>{description}</p>
            <p style={{width: '50%', fontSize: '20px'}}>Rating global: {averageRating}</p> <p style={{width: '50%', fontSize: '20px'}}>Rating de usuarios: {userRating}</p>
            <p style={{width: '33.3%', fontSize: '18px'}}>Categories: {genre}</p>
            <p style={{width: '33.3%', fontSize: '18px'}}>Pages: {pages}</p>
            <p style={{width: '33.3%', fontSize: '18px'}}>{publisher} : {publishedDate}</p>
            <p style={{fontSize: '20px'}}>ISBN : {identifier}</p>
            
            </div>
            </div>
            <Link to="/home" style={{textDecoration: 'none'}}><p className={style.back}>Go back</p></Link>
            </div>
        </div>
    )
}
export default Detail;