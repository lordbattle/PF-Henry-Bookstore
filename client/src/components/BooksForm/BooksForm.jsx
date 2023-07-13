import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postBooks } from "../../redux/actions";
import validationsFormBook from "../../hooks/validationsFormBook";
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
  const [validationErrors, setValidationErrors] = useState({});



  const onSubmit = async (data) => {
    const validationErrors = validationsFormBook(data);
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

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

  const validateField = (fieldName, value) => {
    const validationErrors = validationsFormBook({ [fieldName]: value });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validationErrors[fieldName] || "",
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
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
        {/* <p className={style.pId}>
          User ID : <span>{userState.id ? userState.id : "undefined"}</span>
        </p> */}
        <h1 className={style.h1Titulo}>NEW BOOK</h1>
        <img src={image} alt="imageBookForm" className={style.imageForm} />
        <div className={style.containerSubUno}>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="title"
              placeholder="Insert book title"
              {...register("title", { required: true })}
              onChange={handleChange}
            />
            <label>Title:</label>
            {validationErrors.title && (
              <span className={style.error}>{validationErrors.title}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="subtitle"
              placeholder="Insert book subtitle"
              {...register("subtitle", { required: true })}
              onChange={handleChange}
            />
            <label>Subtitle:</label>
            {validationErrors.subtitle && (
              <span className={style.error}>{validationErrors.subtitle}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="publisher"
              placeholder="Insert book publisher"
              {...register("publisher", { required: true })}
              onChange={handleChange}
            />
            <label>Publisher:</label>
            {validationErrors.publisher && (
              <span className={style.error}>{validationErrors.publisher}</span>
            )}
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
              onChange={handleChange}
            />
            <label>Identifier:</label>
            {validationErrors.identifier && (
              <span className={style.error}>{validationErrors.identifier}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="authors"
              placeholder="Insert authors"
              {...register("authors", { required: true })}
              onChange={handleChange}
            />
            <label>Author:</label>
            {validationErrors.authors && (
              <span className={style.error}>{validationErrors.authors}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <input
              type="text"
              name="genre"
              placeholder="Insert book genres"
              {...register("genre", { required: true })}
              onChange={handleChange}
            />
            <label>Genres:</label>
            {validationErrors.genre && (
              <span className={style.error}>{validationErrors.genre}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <textarea
              className={style.textarea}
              name="description"
              placeholder="Insert book description"
              {...register("description", { required: true })}
              onChange={handleChange}
            />
            <label>Description:</label>
            {validationErrors.description && (
              <span className={style.error}>
                {validationErrors.description}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className={style.buttonBook}></button>

        <span className={style.spanButton}>Create Book</span>

        <div className={style.containerSubDos}>
          <div className={style.inputContainer}>
            <select
              className={style.selectInput}
              name="publishedDate"
              placeholder="Insert book"
              {...register("publishedDate", { required: true })}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              {generateYearOptions()}
            </select>
            <label>Published Date:</label>
            {validationErrors.publishedDate && (
              <span className={style.error}>
                {validationErrors.publishedDate}
              </span>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="price"
              placeholder="Insert book price"
              {...register("price", { required: true })}
              onChange={handleChange}
            />
            <label>Price:</label>
            {validationErrors.price && (
              <span className={style.error}>{validationErrors.price}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="pages"
              placeholder="Insert amount of pages"
              {...register("pages", { required: true })}
              onChange={handleChange}
            />
            <label>Pages:</label>
            {validationErrors.pages && (
              <span className={style.error}>{validationErrors.pages}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              type="number"
              name="stock"
              placeholder="Insert book stock"
              {...register("stock", { required: true })}
              onChange={handleChange}
            />
            <label>Stock:</label>
            {validationErrors.stock && (
              <span className={style.error}>{validationErrors.stock}</span>
            )}
          </div>
          {/* <div className={style.inputContainer}>
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
          </div> */}
          <div className={style.inputContainer}>
            <select
              name="averageRating"
              defaultValue={"DEFAULT"}
              {...register("averageRating", { required: true })}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>
                Average Rating
              </option>
              <option value="1"> 🌟</option>
              <option value="2"> 🌟🌟 </option>
              <option value="3"> 🌟🌟🌟 </option>
              <option value="4"> 🌟🌟🌟🌟 </option>
              <option value="5"> 🌟🌟🌟🌟🌟</option>
            </select>
            <label>Average Rating:</label>
            {validationErrors.averageRating && (
              <span className={style.error}>
                {validationErrors.averageRating}
              </span>
            )}
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
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Book Preview"
              className={style.imagePreview}
              style={{ maxWidth: "250px", maxHeight: "200px" }}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
