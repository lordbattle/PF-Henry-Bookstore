import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getBookById, deleteBook, activeBook, editBook } from "../../../../redux/actions";
import style from '../BookManager/BookManager.module.css';

const BookManager = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);
  console.log("log del details", details);

  const { active, authors, averageRating, bookPic, description, genre, identifier, pages, publishedDate, publisher, subtitle, title, userRating, price, stock } = details;

  const handleDeleteBook = () => {
    dispatch(deleteBook(id));
    window.location = "/dashboard";
  };

  const handleAddToCart = () => {
    const newItem = {
      id: id,
      img: bookPic,
      title: title,
      price: price,
      stock: 1,
    };

    addToCart(newItem);
  };

  const [editedProduct, setEditedProduct] = useState({
    title: title,
    subtitle: subtitle,
    price: price,
    stock: stock,
    authors: authors,
    description: description,
    bookPic: bookPic,
    averageRating: averageRating,
    genre: genre,
    pages: pages,
    publishedDate: publishedDate,
    publisher: publisher,
    identifier: identifier,
  });

  useEffect(() => {
    setEditedProduct({
      title: title,
      subtitle: subtitle,
      price: price,
      stock: stock,
      authors: authors,
      description: description,
      bookPic: bookPic,
      averageRating: averageRating,
      genre: genre,
      pages: pages,
      publishedDate: publishedDate,
      publisher: publisher,
      identifier: identifier,
    });
  }, [
    title,
    subtitle,
    price,
    stock,
    authors,
    description,
    bookPic,
    averageRating,
    genre,
    pages,
    publishedDate,
    publisher,
    identifier,
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    dispatch(editBook(id, editedProduct));
    setIsEditing(false);
    //window.location.reload();
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <div className={style.detail}>
          <h2>ID DEL LIBRO: {id}</h2>
          <h4>
            {active === true ? (
              <button onClick={() => { dispatch(deleteBook(id)); }} className={style.deleteButton}>Deshabilitar producto</button>
            ) : (
              <button onClick={() => (dispatch(activeBook(id)))} className={style.deleteButton}>Habilitar producto</button>
            )}
          </h4>
          <div className={style.buttonGroup}>
            <button onClick={() => setIsEditing(true)} className={style.editButton}>Edit product</button>
            <button onClick={handleDeleteBook} className={style.deleteButton}>Delete Book</button>
          </div>
        </div>

        <div className='d-flex p-3'>
          <img src={bookPic} alt="Imagen del libro" width='35%' />
          <div className={style.advancedDetail}>

            {isEditing && (
              <div className="d-flex flex-column">
                <label style={{ fontSize: '23px' }}>Title:
                  <input
                    placeholder="TITLE"
                    type="text"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleInputChange}
                    style={{ minWidth: '20rem' }}
                  />
                </label>
                <label style={{fontSize: '20px'}}>Subtitle:
                <input
                placeholder="SUBTITLE"
                    type="text"
                    name="subtitle"
                    value={editedProduct.subtitle}
                    onChange={handleInputChange}
                    style={{minWidth: '20rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Price:
                <input
                placeholder="PRICE"
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    style={{maxWidth: '5rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Stock:
                <input
                placeholder="STOCK"
                    type="number"
                    name="stock"
                    value={editedProduct.stock}
                    onChange={handleInputChange}
                    style={{maxWidth: '3.5rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Author's:
                <input
                placeholder="AUTHOR'S"
                    type="text"
                    name="authors"
                    value={editedProduct.authors}
                    onChange={handleInputChange}
                    style={{minWidth: '20rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Genres:
                <input
                placeholder="GENRES"
                    type="text"
                    name="genre"
                    value={editedProduct.genre}
                    onChange={handleInputChange}
                    style={{minWidth: '20rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Identifier:
                <input
                placeholder="IDENTIFIER"
                    type="text"
                    name="identifier"
                    value={editedProduct.identifier}
                    onChange={handleInputChange}
                    style={{maxWidth: '8rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Publisher:
                <input
                placeholder="PUBLISHER"
                    type="text"
                    name="publisher"
                    value={editedProduct.publisher}
                    onChange={handleInputChange}
                    style={{minWidth: '20rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Published date:
                <input
                placeholder="PUBLISHED DATE"
                    type="text"
                    name="publishedDate"
                    value={editedProduct.publishedDate}
                    onChange={handleInputChange}
                    style={{maxWidth: '3rem'}}
                />
            </label>
            <label style={{fontSize: '18px'}}>Description:</label>
                <textarea
                placeholder="DESCRIPTION"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                /><br/>
            <div className="d-flex justify-content-around">
            <button className={style.cancel} onClick={()=>setIsEditing(false)}>Cancel update</button>
            <button className={style.update} onClick={handleEditProduct}>Update product</button>
            </div>
            </div>)}

            {!isEditing && (
              <>
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
              </>
            )}

          </div>
        </div>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}><p className={style.back}>Go back</p></Link>
      </div>
    </div>
  );
};

export default BookManager;
