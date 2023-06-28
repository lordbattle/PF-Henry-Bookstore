import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { postBooks } from "../../redux/actions";
import style from '../BooksForm/BooksForm.module.css'
import image from '../../images/bookForm.png';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

const AddBookForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [imageUpload, setImageUpload] = useState('');
  const [ file , setFile ] = useState();
  const [book, setBook] = useState({
    title: "",
    subtitle: "",
    publishedDate: "",
    publisher: "",
    description: "",
    pages: "",
    averageRating: "",
    usersRating: "",
    identifier: "",
    price: "",
    stock: "",
    author: "",
    genres: "",
    bookPic: "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
  });

  const handleChange = (event) => {
    if (event.target.name === "bookPic") {
      setBook({
        ...book,
        image: event.target.files[0],
      });
    } else {
      setBook({
        ...book,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ['title', 'subtitle', 'publishedDate', 'publisher', 'description', 'pages', 'averageRating', 'usersRating', 'identifier', 'authors', 'genre'];
    const emptyFields = requiredFields.filter((field) => !book[field]);

    if (emptyFields.length > 0) {
      const errorMessage = `Please complete the following fields: ${emptyFields.join(', ')}`;
      alert(errorMessage);
      return;
    }
    dispatch(postBooks(book));

    setBook({

      title: "",
      subtitle: "",
      publishedDate: "",
      publisher: "",
      description: "",
      pages: "",
      averageRating: "",
      usersRating: "",
      identifier: "",
      price: "",
      stock: "",
      author: "",
      genres: "",
      bookPic: "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
    });
    alert("Book added successfully");
  };
  const handleImageClick = () => {
    inputRef.current.click();
  }
  
  const handleImageChange = ( event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  }

  return (
    <div className={style.containerForm}>
      <form onSubmit={handleSubmit} className={style.main}>
        <h1 className={style.h1Titulo}>NEW BOOK</h1>
        <img src={image} alt="imageBookForm" className={style.imageForm} />
        <div className={style.containerSubUno}>

          <div className={style.inputContainer}>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
            <label>Title:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="subtitle"
              value={book.subtitle}
              onChange={handleChange}
              required
            />
            <label>Subtitle:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="publisher"
              value={book.publisher}
              onChange={handleChange}
              required
            />
            <label>Publisher:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="identifier"
              value={book.identifier}
              onChange={handleChange}
              required
            />
            <label>Identifier:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="authors"
              value={book.authors}
              onChange={handleChange}
              required
            />
            <label>Author:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              required
            />
            <label>Genres:</label>
          </div>
          <div className={style.inputContainerImage} onClick={handleImageClick}>
            <label>Image:</label>
            {/* <input type="url" name="bookPic" value={book.bookPic} onChange={handleChange} required /> */}
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
            {imageUpload ?
              <img src={imageUpload} width={40} height={40} alt={file} />
              :
              <MdCloudUpload color="#1475cf" size={40}  />
            }

          </div>
        </div>

        <button type="submit" onClick={handleSubmit} className={style.buttonBook}></button>
        <span className={style.spanButton}>Crear Book</span>

        <div className={style.containerSubDos}>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="publishedDate"
              value={book.publishedDate}
              onChange={handleChange}
              required
            />
            <label>Published Date:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="price"
              value={book.price}
              onChange={handleChange}
              required
            />
            <label>Price:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="pages"
              value={book.pages}
              onChange={handleChange}
              required
            />
            <label>Pages:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="stock"
              value={book.stock}
              onChange={handleChange}
              required
            />
            <label>Stock:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="usersRating"
              value={book.usersRating}
              min="0"
              max="5"
              step="1"
              onChange={handleChange}
              required
            />
            <label>Users Rating:</label>
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="averageRating"
              value={book.averageRating}
              min="0"
              max="5"
              step="1"
              onChange={handleChange}
              required
            />
            <label>Average Rating:</label>
          </div>
          <div className={style.inputContainer}>
            <textarea className={style.textarea}
              name="description"
              value={book.description}
              onChange={handleChange}
              required
            />
            <label>Description:</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;

