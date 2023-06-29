import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postBooks } from "../../redux/actions";
import style from '../BooksForm/BooksForm.module.css';
import image from '../../images/bookForm.png';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

const AddBookForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [imageUpload, setImageUpload] = useState('');
  const [file, setFile] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const bookData = {
      ...data,
      bookPic: data.bookPic || "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
    };

    dispatch(postBooks(bookData));
    alert("Book added successfully");
  };

  const generateYearOptions = () => {
    const options = [];
    for (let year = 2030; year >= 1800; year--) {
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return options;
  };

  const handleImageClick = () => {
    inputRef.current.click();
  }

  return (
    <div className={style.containerForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.main}>
        <h1 className={style.h1Titulo}>NEW BOOK</h1>
        <img src={image} alt="imageBookForm" className={style.imageForm} />
        <div className={style.containerSubUno}>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="title"
              placeholder="Insert book title"
              {...register("title", { required: true })}
            />
            <label>Title:</label>
            {errors.title && <p>Title is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="subtitle"
              placeholder="Insert book subtitle"
              {...register("subtitle", { required: true })}
            />
            <label>Subtitle:</label>
            {errors.subtitle && <p>Subtitle is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="publisher"
              placeholder="Insert book publisher"
              {...register("publisher", { required: true })}
            />
            <label>Publisher:</label>
            {errors.publisher && <p>Publisher is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="identifier"              
              placeholder="Insert the 13 digits"
              {...register("identifier", {
                required: true,
                pattern: /^[0-9]+$/,
                maxLength: 13,
              })}
            />
            <label>Identifier:</label>
            {errors.identifier && <p>Identifier must be 13 digits long and numbers only</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="authors"
              placeholder="Insert authors"
              {...register("authors", { required: true })}
            />
            <label>Author:</label>
            {errors.authors && <p>Author is required</p>}
          </div>
          <div className={style.inputContainer} >
            <input
              type="text"
              name="genre"
              placeholder="Insert book genres"
              {...register("genre", { required: true })}
            />
            <label>Genres:</label>
            {errors.genre && <p>Genre is required</p>}
          </div>
          <div className={style.inputContainerImage} onClick={handleImageClick}>
            <label>Image:</label>
            {/* <input type="url" name="bookPic" value={book.bookPic} onChange={handleChange} required /> */}
            <input type="file" name='bookPic' accept="image/*" ref={inputRef}   {...register("bookPic")} style={{ display: 'none' }} />
            {imageUpload ?
              <img src={URL.createObjectURL(imageUpload)} style={{ borderRadius: '10%', boxShadow: '0 0 8px black' }} width={70} height={70} alt={file} />
              :
              <MdCloudUpload color="#1475cf" size={40} />
            }
          </div>
        </div>
        <button type="submit" className={style.buttonBook}></button>
        <span className={style.spanButton}>Crear Book</span>

        <div className={style.containerSubDos}>
          <div className={style.inputContainer}>
            <select
              name="publishedDate"
              placeholder="Insert book"
              {...register("publishedDate", { required: true })}
            >
              <option value="">Select Year</option>
              {generateYearOptions()}
            </select>
            <label>Published Date:</label>
            {errors.publishedDate && <p>Published Date is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="price"
              placeholder="Insert book price"
              {...register("price", { required: true })}
            />
            <label>Price:</label>
            {errors.price && <p>Price is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="pages"
              placeholder="Insert amount of pages"
              {...register("pages", { required: true })}
            />
            <label>Pages:</label>
            {errors.pages && <p>Pages is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="stock"
              placeholder="Insert book stock"
              {...register("stock", { required: true })}
            />
            <label>Stock:</label>
            {errors.stock && <p>Stock is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
             type="number"
             name="usersRating"
             min="0"
             max="5"
             step="1"
             {...register("usersRating", { required: true })}
            />
            <label>Users Rating:</label>
            {errors.usersRating && <p>Users Rating is required</p>}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="averageRating"
              min="0"
              max="5"
              step="1"
              {...register("averageRating", { required: true })}
            />
            <label>Average Rating:</label>
            {errors.averageRating && <p>Average Rating is required</p>}
          </div>
          <div className={style.inputContainer}>
            <textarea className={style.textarea}
              name="description"
              placeholder="Insert book description"
              {...register("description", { required: true })}
            />
            <label>Description:</label>
            {errors.description && <p>Description is required</p>}
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddBookForm;