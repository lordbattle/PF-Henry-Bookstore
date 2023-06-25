const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { User, Book, Genre, Author, ReviewStore } = require("../db");
const { bookFilterAndPagination } = require("../helpers/bookFilterAndPagination");
const crypto = require("crypto");
const { Op } = require("sequelize");

const saveAllBooksDb = async (req, res) => {
  try {
    for (let index = 0; index < 100; index = index = index + 50) {
      const { data: allBooksApi } = await axios(
        `${API_URL}startIndex=${index}&maxResults=40&q=%20+title&key=AIzaSyDIEQFwVWL0GFcB3moa_sL8euql4UjAm7k`
      );

      //devuelve los identifier correspondientes en String
      const stringIdentifier = (industryIdentifiers) => {
        let stringIdentifier = "";
        if (typeof industryIdentifiers === "undefined")
          return "It does not have identifier";

        if (Array.isArray(industryIdentifiers)) {
          for (let i = 0; i < industryIdentifiers.length; i++) {
            stringIdentifier += `type: ${industryIdentifiers[i].type} - identifier: ${industryIdentifiers[i].identifier}, `;
          }
        }
        return stringIdentifier;
      };

      const stringAuthors = (authors) => {
        if (typeof authors === "undefined") return "Not authors";

        return authors.toString();
      };

      const stringCategories = (categories) => {
        if (typeof categories === "undefined") return "Not categories";

        return categories.toString();
      };

      for (let i = 0; i < allBooksApi.items.length; i++) {
        console.log(index, i, allBooksApi.items[i].volumeInfo.title);
        //Se crea el libro
        const newBook = await Book.findOrCreate({
          where: {
            title: allBooksApi.items[i].volumeInfo.title.slice(0, 50),
          },
          defaults: {
            subtitle: allBooksApi.items[i].volumeInfo.subtitle
              ? allBooksApi.items[i].volumeInfo.subtitle
              : "It does not have subtitles",
            publishedDate: allBooksApi.items[i].volumeInfo.publishedDate,
            publisher: allBooksApi.items[i].volumeInfo.publisher
              ? allBooksApi.items[i].volumeInfo.publisher
              : "It does not have publisher",
            description: allBooksApi.items[i].volumeInfo.description
              ? allBooksApi.items[i].volumeInfo.description
              : "It does not have description",
            pages: allBooksApi.items[i].volumeInfo.pageCount,
            averageRating: allBooksApi.items[i].volumeInfo.averageRating
              ? allBooksApi.items[i].volumeInfo.averageRating
              : 2,
            identifier: stringIdentifier(
              allBooksApi.items[i].volumeInfo.industryIdentifiers
            ),
            bookPic: allBooksApi.items[i].volumeInfo.hasOwnProperty(
              "imageLinks"
            )
              ? allBooksApi.items[i].volumeInfo.imageLinks.smallThumbnail
              : "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
            authors: stringAuthors(allBooksApi.items[i].volumeInfo.authors),
            genre: stringCategories(allBooksApi.items[i].volumeInfo.categories),
            price : allBooksApi.items[i].saleInfo.listPrice ? allBooksApi.items[i].saleInfo.listPrice.amount : 0 ,
          },
        });

        /* //Se crea el autor
        allBooksApi.items[i].volumeInfo.authors?.forEach(async (author) => {
          const newAuthor = await Author.findOrCreate({
            where: {
              name: author,
            },
          });
        });

        //Se crea los generos
        allBooksApi.items[i].volumeInfo.categories?.forEach(
          async (categorie) => {
            const newCategorie = await Genre.findOrCreate({
              where: {
                name: categorie,
              },
            });
          }
        ); */
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};



const getAllBooks = async () => {
  return await Book.findAll();
};


/*return books that contain genre, may or may not have the other params
 * order : asc to sort ascending and desc to sort descending
 * price : true to order not by title but by the price of the books in specified order
 * page : page number you want to see from your search
 * limit : limit number of books to view per page*/
const getBookByGenres = async (genre, order, page, limit, price) => {
  let bookByGenre = await Book.findAll({
    where: {
      genre: { [Op.iLike]: "%" + genre + "%" },
    },
  });
  if (order || page || limit)
    return bookFilterAndPagination(bookByGenre, order, page, limit, price);
  else
    return bookByGenre;
}

const getBookByAuthor = async (author, order, page, limit, price) => {
  let bookByAuthors = await Book.findAll({
    where: {
      authors: { [Op.iLike]: "%" + author + "%" },
    },
  });
  if (order || page || limit)
    return bookFilterAndPagination(bookByAuthors, order, page, limit, price);
  else
    return bookByAuthors;
}

const getBooksBytitle = async (title, order, page, limit, price) => {
  let bookByTitle = await Book.findAll({
    where: {
      title: { [Op.iLike]: "%" + title + "%" },
    },
  });

  if (order || page || limit)
    return bookFilterAndPagination(bookByTitle, order, page, limit, price);
  else
    return bookByTitle;


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
  authors,
  genre
) => {
  let newBook = await Book.create({
    id,
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
    authors,
    genre,
  });
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
  identifier,
  bookPic,
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
      identifier,
      bookPic,
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
  return await Book.destroy({
    where: { id: idBook },
  });
};

module.exports = {
  saveAllBooksDb,
  getAllBooks,
  getBooksBytitle,
  getBookById,
  postBook,
  putBook,
  deleteBook,
};
