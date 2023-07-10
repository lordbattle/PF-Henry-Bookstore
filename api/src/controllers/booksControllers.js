const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { User, Book, Genre, Author, ReviewStore, conn } = require("../db");
const {
  wildcardFilterAndPagination,
} = require("../helpers/wildcardFilterAndPagination");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { API_CLOUDINARY_BOOKS_UPLOAD_PRESET } = process.env;

const { cloudinary } = require("../services/cloudinaryService");
const { getUserById } = require('./usersControllers');

const saveAllBooksDb = async () => {
  try {
    for (let index = 0; index < 500; index = index = index + 50) {
      const { data: allBooksApi } = await axios(
        `${API_URL}startIndex=${index}&maxResults=40&q=%20+title&key=AIzaSyDIEQFwVWL0GFcB3moa_sL8euql4UjAm7k`
      );

      //devuelve los identifier correspondientes en String
      /* const stringIdentifier = (industryIdentifiers) => {
        let stringIdentifier = "";
        if (typeof industryIdentifiers === "undefined")
          return "It does not have identifier";

        if (Array.isArray(industryIdentifiers)) {
          for (let i = 0; i < industryIdentifiers.length; i++) {
            stringIdentifier += `type: ${industryIdentifiers[i].type} - identifier: ${industryIdentifiers[i].identifier}, `;
          }
        }
        return stringIdentifier;
      }; */

      const stringAuthors = (authors) => {
        if (typeof authors === "undefined") return "Not authors";

        return authors.toString();
      };

      const stringCategories = (categories) => {
        if (typeof categories === "undefined") return "Not categories";

        return categories.toString();
      };

      for (let i = 0; i < allBooksApi.items?.length; i++) {
        console.log(index, i, allBooksApi.items[i].volumeInfo.title);

        //Create book
        const newBook = await Book.findOrCreate({
          where: {
            title: allBooksApi.items[i].volumeInfo.title.slice(0, 50),
          },
          defaults: {
            subtitle: allBooksApi.items[i].volumeInfo.subtitle
              ? allBooksApi.items[i].volumeInfo.subtitle
              : "It does not have subtitles",
            publishedDate: allBooksApi.items[i].volumeInfo.publishedDate
              ? allBooksApi.items[i].volumeInfo.publishedDate.slice(0, 4)
              : 1900,
            publisher: allBooksApi.items[i].volumeInfo.publisher
              ? allBooksApi.items[i].volumeInfo.publisher
              : "It does not have publisher",
            description: allBooksApi.items[i].volumeInfo.description
              ? allBooksApi.items[i].volumeInfo.description
              : "It does not have description",
            pages: allBooksApi.items[i].volumeInfo.pageCount
              ? allBooksApi.items[i].volumeInfo.pageCount
              : 150,
            averageRating: allBooksApi.items[i].volumeInfo.averageRating
              ? allBooksApi.items[i].volumeInfo.averageRating
              : Math.floor(Math.random() * (5 - 1 + 1)) + 1,
            /* identifier: stringIdentifier(
              allBooksApi.items[i].volumeInfo.industryIdentifiers
            ), */
            bookPic: allBooksApi.items[i].volumeInfo.hasOwnProperty(
              "imageLinks"
            )
              ? allBooksApi.items[i].volumeInfo.imageLinks.smallThumbnail
              : "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
            authors: stringAuthors(allBooksApi.items[i].volumeInfo.authors),
            genre: stringCategories(allBooksApi.items[i].volumeInfo.categories),
          },
        });
      }
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

const getAllBooks = async () => {
  return await Book.findAll();
};

/*return books that contain first three queries, may or may not have the other params
 * order : asc to sort ascending and desc to sort descending
 * price : true to order not by title but by the price of the books in specified order
 * page : page number you want to see from your search
 * limit : limit number of books to view per page*/
const getBookBySearch = async (
  title,
  author,
  genre,
  orderTitle,
  orderPrice,
  orderStock,
  page,
  limit,
  price,
  stock
) => {
  let whereClause = {};
  if (title) {
    whereClause.title = { [Op.iLike]: "%" + title + "%" };
  }

  if (author) {
    whereClause.authors = { [Op.iLike]: "%" + author + "%" };
  }

  if (genre) {
    whereClause.genre = { [Op.iLike]: "%" + genre + "%" };
  }

  if (price) {
    if (Number(price) === 1) {
      whereClause.price = { [Op.between]: [0, 500] };
    } else if (Number(price) === 2) {
      whereClause.price = { [Op.between]: [500, 5000] };
    } else if (Number(price) === 3) {
      whereClause.price = { [Op.between]: [5000, 30000] };
    }
  }


  let bookBySearch = await Book.findAll({
    where: whereClause,
  });

 

  if (orderTitle || orderPrice || orderStock || page || limit)
    return wildcardFilterAndPagination(
      bookBySearch,
      orderTitle,
      orderPrice,
      orderStock,
      page,
      limit,
      price,
      stock
    );
  else return bookBySearch;
};

const getBookById = async (idBook) => {
  return await Book.findByPk(idBook);
};



const postBook = async (
  title,
  subtitle,
  publishedDate,
  publisher,
  description,
  pages,
  averageRating,
  usersRating,
  identifier,
  bookPic,
  price,
  stock,
  authors,
  genre,
  userId
) => {
  console.log("LLego el userLogin?" + userId)
  const { secure_url } = await cloudinary.uploader.upload(bookPic, {
    upload_preset: API_CLOUDINARY_BOOKS_UPLOAD_PRESET,
    /* resource_type: "image",
    folder: "books",
    public_id: "private_image",
    type: "private", */
  });

  const newBook = await Book.create({
    title,
    subtitle,
    publishedDate,
    publisher,
    description,
    pages,
    averageRating,
    usersRating,
    identifier,
    bookPic: secure_url, // Guarda la URL segura en el atributo bookPic
    price,
    stock,
    authors,
    genre, 
    userId :userId 
  });
  console.log(newBook, ' bookk prueba relacion ')
  //relacion de libro con usuario que lo crea 
  // if(userlogin)
  // let userId ;
  // try {
  //   userId = await getUserById(pages)
  // } catch (error) {
  //   console.log(error, 'error en try bookk prueba ')
  // }
  // console.log(userId.id, 'user id encontrado en book')
  // await userId.addUser(newBook);

  return newBook;
};



const putBook = async (
  idBook,
  title,
  subtitle,
  publishedDate,
  publisher,
  description,
  pages,
  averageRating,
  usersRating,
  active,
  identifier,
  bookPic,
  price,
  stock,
  authors,
  genre
) => {
  const updateBook = Book.update(
    {
      title,
      subtitle,
      publishedDate,
      publisher,
      description,
      pages,
      averageRating,
      usersRating,
      active,
      identifier,
      bookPic,
      price,
      stock,
      authors,
      genre,
    },
    {
      where: { id: idBook },
    }
  );
  return updateBook;
};

const deleteBook = async (idBook) => {
  const book = await Book.findByPk(idBook);

  if (!book) {
    throw Error("There is no book with the specified id");
  }

  book.active = false;
  await book.save();

  return book;
};

module.exports = {
  saveAllBooksDb,
  getAllBooks,
  getBookBySearch,
  getBookById,
  postBook,
  putBook,
  deleteBook,
};
