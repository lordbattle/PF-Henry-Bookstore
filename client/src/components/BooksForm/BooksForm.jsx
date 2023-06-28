import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postBooks } from "../../redux/actions";
import style from '../BooksForm/BooksForm.module.css';

const AddBookForm = () => {
  const dispatch = useDispatch();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.main}>
      <label>
        Title:
        <input
          className={style.input}
          type="text"
          name="title"
          placeholder="Insert book title"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Title is required</p>}
      </label>
      <br />
      <label>
        Subtitle:
        <input
          className={style.input}
          type="text"
          name="subtitle"
          placeholder="Insert book subtitle"
          {...register("subtitle", { required: true })}
        />
        {errors.subtitle && <p>Subtitle is required</p>}
      </label>
      <br />
      <label>
        Published Date:
        <select
          className={style.input}
          name="publishedDate"
          placeholder="Insert book"
          {...register("publishedDate", { required: true })}
        >
          <option value="">Select Year</option>
          {generateYearOptions()}
        </select>
        {errors.publishedDate && <p>Published Date is required</p>}
      </label>
      <br />
      <label>
        Publisher:
        <input
          className={style.input}
          type="text"
          name="publisher"
          placeholder="Insert book publisher"
          {...register("publisher", { required: true })}
        />
        {errors.publisher && <p>Publisher is required</p>}
      </label>
      <br />
      <label>
        Description:
        <textarea
          className={style.input}
          name="description"
          placeholder="Insert book description"
          {...register("description", { required: true })}
        />
        {errors.description && <p>Description is required</p>}
      </label>
      <br />
      <label>
        Pages:
        <input
          className={style.input}
          type="number"
          name="pages"
          placeholder="Insert amount of pages"
          {...register("pages", { required: true })}
        />
        {errors.pages && <p>Pages is required</p>}
      </label>
      <br />
      <label>
        Average Rating:
        <input
          className={style.input}
          type="number"
          name="averageRating"
          min="0"
          max="5"
          step="1"
          {...register("averageRating", { required: true })}
        />
        {errors.averageRating && <p>Average Rating is required</p>}
      </label>
      <br />
      <label>
        Users Rating:
        <input
          className={style.input}
          type="number"
          name="usersRating"
          min="0"
          max="5"
          step="1"
          {...register("usersRating", { required: true })}
        />
        {errors.usersRating && <p>Users Rating is required</p>}
      </label>
      <br />
      <label>
        Identifier:
        <input
          className={style.input}
          type="text"
          name="identifier"
          placeholder="Insert the 13 digits"
          {...register("identifier", {
            required: true,
            pattern: /^[0-9]+$/,
            maxLength: 13,
          })}
        />
        {errors.identifier && <p>Identifier must be 13 digits long and numbers only</p>}
      </label>
      <br />
      <br />
      <label>
        Price:
        <input
          className={style.input}
          type="number"
          name="price"
          placeholder="Insert book price"
          {...register("price", { required: true })}
        />
        {errors.price && <p>Price is required</p>}
      </label>
      <br />
      <br />
      <label>
        Stock:
        <input
          className={style.input}
          type="number"
          name="stock"
          placeholder="Insert book stock"
          {...register("stock", { required: true })}
        />
        {errors.stock && <p>Stock is required</p>}
      </label>
      <br />
      <label>
        Author:
        <input
          className={style.input}
          type="text"
          name="authors"
          placeholder="Insert authors"
          {...register("authors", { required: true })}
        />
        {errors.authors && <p>Author is required</p>}
      </label>
      <br />
      <label>
        Genres:
        <input
          className={style.input}
          type="text"
          name="genre"
          placeholder="Insert book genres"
          {...register("genre", { required: true })}
        />
        {errors.genre && <p>Genre is required</p>}
      </label>
      <br />
      <label>
        Image:
        <input
          className={style.input}
          type="url"
          name="bookPic"
          {...register("bookPic")}
        />
      </label>
      <br />
      <button type="submit">Publish Book</button>
    </form>
  );
};

export default AddBookForm;