import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getBookById, deleteBook, activeBook, editBook } from "../../../../redux/actions";
import style from '../BookManager/BookManager.module.css';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BookManager = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const details = useSelector((state) => state.details);
  console.log("log del details", details);

  const { active, authors, averageRating, bookPic, description, genre, identifier, pages, publishedDate, publisher, subtitle, title, userRating, price, stock } = details;

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setValue("title", title);
    setValue("subtitle", subtitle);
    setValue("price", price);
    setValue("stock", stock);
    setValue("authors", authors);
    setValue("description", description);
    setValue("bookPic", bookPic);
    setValue("averageRating", averageRating);
    setValue("genre", genre);
    setValue("pages", pages);
    setValue("publishedDate", publishedDate);
    setValue("publisher", publisher);
    setValue("identifier", identifier);
  }, [title, subtitle, price, stock, authors, description, bookPic, averageRating, genre, pages, publishedDate, publisher, identifier, setValue]);

  const handleDeleteBook = async () => {
    await Swal.fire(
      'The product was deleted',
      '',
      'error'
    )
    dispatch(deleteBook(id))
    window.location = "/dashboard";
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProduct = (data) => {
    dispatch(editBook(id, data));
    setIsEditing(false);
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
          <img src={bookPic} alt="Imagen del libro" className={style.img} />
          <div className={style.advancedDetail}>

            {isEditing ? (
              <form onSubmit={handleSubmit(handleEditProduct)} className="d-flex flex-column">
                <label style={{ fontSize: '23px' }}>Title:
                  <input
                    placeholder="TITLE"
                    type="text"
                    {...register("title", { required: true, maxLength: 50 })}
                    style={{ minWidth: '20rem' }}
                  />
                  {errors.title && <p>Title is required and should have a maximum of 50 characters</p>}
                </label>
                <label style={{ fontSize: '20px' }}>Subtitle:
                  <input
                    placeholder="SUBTITLE"
                    type="text"
                    {...register("subtitle", { required: true })}
                    style={{ minWidth: '20rem' }}
                  />
                  {errors.subtitle && <p>Subtitle is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Price:
                  <input
                    placeholder="PRICE"
                    type="number"
                    {...register("price", { required: true })}
                    style={{ maxWidth: '5rem' }}
                  />
                  {errors.price && <p>Price is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Stock:
                  <input
                    placeholder="STOCK"
                    type="number"
                    {...register("stock", { required: true })}
                    style={{ maxWidth: '3.5rem' }}
                  />
                  {errors.stock && <p>Stock is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Author's:
                  <input
                    placeholder="AUTHOR'S"
                    type="text"
                    {...register("authors", { required: true })}
                    style={{ minWidth: '20rem' }}
                  />
                  {errors.authors && <p>Author's is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Genres:
                  <input
                    placeholder="GENRES"
                    type="text"
                    {...register("genre", { required: true })}
                    style={{ minWidth: '20rem' }}
                  />
                  {errors.genre && <p>Genres is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Identifier:
                  <input
                    placeholder="IDENTIFIER"
                    type="text"
                    {...register("identifier", { required: true, maxLength: 13, pattern: /^\d*$/ })}
                    style={{ maxWidth: '8rem' }}
                  />
                  {errors.identifier && <p>Identifier is required and should be a number with a maximum of 13 digits</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Publisher:
                  <input
                    placeholder="PUBLISHER"
                    type="text"
                    {...register("publisher", { required: true })}
                    style={{ minWidth: '20rem' }}
                  />
                  {errors.publisher && <p>Publisher is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Published date:
                  <input
                    placeholder="PUBLISHED DATE"
                    type="text"
                    {...register("publishedDate", { required: true })}
                    style={{ maxWidth: '3rem' }}
                  />
                  {errors.publishedDate && <p>Published date is required</p>}
                </label>
                <label style={{ fontSize: '18px' }}>Description:</label>
                <textarea
                  placeholder="DESCRIPTION"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && <p>Description is required</p>}
                <div className="d-flex justify-content-around">
                  <button className={style.cancel} onClick={() => setIsEditing(false)}>Cancel update</button>
                  <button className={style.update} type="submit">Update product</button>
                </div>
              </form>
            ) : (
              <>
                <h1 style={{ width: '100%', fontSize: '30px' }}>{title}</h1>
                <h2 style={{ fontSize: '18px' }}>{subtitle}</h2>
                <p style={{ fontSize: '20px' }}>Price: ${price}</p>
                <p style={{ fontSize: '20px' }}>Stock: {stock}</p>
                <p style={{ fontSize: '20px' }}>Author's: {authors}</p>
                <p style={{ fontSize: '20px', maxHeight: '60%', borderRadius: '20px', paddingLeft: '8px', backgroundColor: '#71a6e2' }}>{description}</p>
                <p style={{ width: '50%', fontSize: '20px' }}>Rating global: {averageRating}</p> <p style={{ width: '50%', fontSize: '20px' }}></p>
                <p style={{ width: '33.3%', fontSize: '18px' }}>Categories: {genre}</p>
                <p style={{ width: '33.3%', fontSize: '18px' }}>Pages: {pages}</p>
                <p style={{ width: '33.3%', fontSize: '18px' }}>{publisher} : {publishedDate}</p>
                <p style={{ fontSize: '20px' }}>ISBN : {identifier}</p>
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
