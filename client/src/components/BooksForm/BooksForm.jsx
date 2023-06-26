import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    author: '',
    genres: '',
    image: null,
  });

  const handleChange = (event) => {
    if (event.target.name === 'image') {
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
      author: '',
      genres: '',
      image: null,
    });

    alert('Book added successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Author:
        <input
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
        <input
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
        <input type="file" name="image" onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;