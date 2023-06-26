import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postBooks } from '../../redux/actions';

const AddBookForm = () => {
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    title: '',
    subtitle: '',
    publishedDate: '',
    publisher: '',
    description: '',
    pages: '',
    averageRating: '',
    usersRating: '',
    identifier: '',
    authors: '',
    genre: '',
    bookPic: "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
    price: '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'bookPic') {
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
      title: '',
      subtitle: '',
      publishedDate: '',
      publisher: '',
      description: '',
      pages: '',
      averageRating: '',
      usersRating: '',
      identifier: '',
      authors: '',
      genre: '',
      bookPic: "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
      price: '',
    });

    alert('Book added successfully');
  };

  return (
    <form onSubmit={handleSubmit} style={{color: 'black'}}>
      <label>
        Title:
        <input
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
        <input
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
        <input
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
        <input
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
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Pages:
        <input
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
        <input
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
        <input
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
        <input
          type="text"
          name="identifier"
          value={book.identifier}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        authors:
        <input
          type="text"
          name="authors"
          value={book.authors}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Genres:
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Image:
        <input type="url" name="bookPic" value={book.bookPic}onChange={handleChange} required />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit}>Create Book</button>
    </form>
  );
};

export default AddBookForm;