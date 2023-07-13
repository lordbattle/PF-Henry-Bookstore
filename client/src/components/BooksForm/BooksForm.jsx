import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postBooks } from "../../redux/actions";
import style from "../BooksForm/BooksForm.module.css";
import image from "../../images/bookForm.png";
import Swal from "sweetalert2";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const inputRef = useRef(null);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Error image",
        text: `"Please select an image"`,
        backdrop: true,
      });
      return;
    }

    formData.append("bookPic", file);
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("publisher", data.publisher);
    formData.append("identifier", data.identifier);
    formData.append("authors", data.authors);
    formData.append("genre", data.genre);
    formData.append("publishedDate", data.publishedDate);
    formData.append("price", data.price);
    formData.append("pages", data.pages);
    formData.append("stock", data.stock);
    formData.append("usersRating", data.usersRating);
    formData.append("averageRating", data.averageRating);
    formData.append("description", data.description);
    formData.append("userId", userState.id);

    try {
      const response = await dispatch(postBooks(formData));
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "successfully!",
          text: "Book added successfully!",
          backdrop: true,
        });
        navigate("/home");
      } else {
        console.log("entro a error  ", data);
        Swal.fire({
          icon: "error",
          title: "Error Data",
          text: `${response.response.data.error}`,
          backdrop: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Data",
        text: `${error}`,
        backdrop: true,
      });
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
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
    <div className={style.containerForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.main}>
        <p className={style.pId}>
          User ID : <span>{userState.id ? userState.id : "undefined"}</span>
        </p>
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
              maxLength="13"
              {...register("identifier", {
                required: true,
                pattern: /^[0-9]+$/,
              })}
            />
            <label>Identifier:</label>
            {errors.identifier && (
              <p>Identifier must be 13 digits long and numbers only</p>
            )}
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
          <div className={style.inputContainer}>
            <input
              type="text"
              name="genre"
              placeholder="Insert book genres"
              {...register("genre", { required: true })}
            />
            <label>Genres:</label>
            {errors.genre && <p>Genre is required</p>}
          </div>
          <div className={style.inputContainerImage}>
            <label>Image:</label>
            <input
              type="file"
              className={style.uploadImageInput}
              name="bookPic"
              accept="image/*"
              required=""
              id="file-input"
              ref={inputRef}
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Book Preview"
                className={style.imagePreview}
                style={{ maxWidth: "250px", maxHeight: "200px" }}
              />
            )}
          </div>
        </div>

        <button type="submit" className={style.buttonBook}></button>

        <span className={style.spanButton}>Crear Book</span>

        <div className={style.containerSubDos}>
          <div className={style.inputContainer}>
            <select
              className={style.selectInput}
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
            <textarea
              className={style.textarea}
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
