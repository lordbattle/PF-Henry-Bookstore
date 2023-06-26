import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postBooks } from "../../redux/actions";
import style from '../BooksForm/BooksForm.module.css'

const AddBookForm = () => {
  const dispatch = useDispatch();
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
    image: null,
  });

  const handleChange = (event) => {
    if (event.target.name === "image") {
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

    // const requiredFields = ['title', 'subtitle', 'publishedDate', 'publisher', 'description', 'pages', 'averageRating', 'usersRating', 'identifier', 'author', 'genres'];
    // const emptyFields = requiredFields.filter((field) => !book[field]);

    // if (emptyFields.length > 0) {
    //   const errorMessage = `Please complete the following fields: ${emptyFields.join(', ')}`;
    //   alert(errorMessage);
    //   return;
    // }
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
      image: null,
    });

    alert("Book added successfully");
  };

  return (
    <form onSubmit={handleSubmit} className={style.main}>
      <label>
        Title:
        <input className={style.input}
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Subtitle:
        <input className={style.input}
          type="text"
          name="subtitle"
          value={book.subtitle}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Published Date:
        <input className={style.input}
          type="text"
          name="publishedDate"
          value={book.publishedDate}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Publisher:
        <input className={style.input}
          type="text"
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea className={style.input}
          name="description"
          value={book.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Pages:
        <input className={style.input}
          type="text"
          name="pages"
          value={book.pages}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Average Rating:
        <input className={style.input}
          type="number"
          name="averageRating"
          value={book.averageRating}
          min="0"
          max="5"
          step="0.1"
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Users Rating:
        <input className={style.input}
          type="number"
          name="usersRating"
          value={book.usersRating}
          min="0"
          max="5"
          step="0.1"
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Identifier:
        <input className={style.input}
          type="text"
          name="identifier"
          value={book.identifier}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Price:
        <input className={style.input}
          type="text"
          name="price"
          value={book.price}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Stock:
        <input className={style.input}
          type="text"
          name="stock"
          value={book.stock}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Author:
        <input className={style.input}
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Genres:
        <input className={style.input}
          type="text"
          name="genres"
          value={book.genres}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Image:
        <input className={style.input} type="file" name="image" onChange={handleChange} required />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Create Book
      </button>
    </form>
  );
};

export default AddBookForm;
