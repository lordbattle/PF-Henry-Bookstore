const {
  saveAllBooksDb,
  getAllBooks,
  getBookBySearch,
  getBookById,
  postBook,
  putBook,
  deleteBook,
} = require("../controllers/booksControllers");

//Save API data in the DB
saveAllBooksDb();

const getBooksHandler = async (req, res) => {
  const { title, author, genre, order, page, limit, price, stock } = req.query;
  try {
    let search = [];

    if (title) {
      search.push(title);
    } else {
      search.push("");
    }

    if (author) {
      search.push(author);
    } else {
      search.push("");
    }

    if (genre) {
      search.push(genre);
    } else {
      search.push("");
    }

    if (search) {
      const bookByName = await getBookBySearch(
        title,
        author,
        genre,
        order,
        page,
        limit,
        price,
        stock,
      );
      bookByName.length > 0
        ? res.status(200).json(bookByName)
        : res
            .status(404)
            .json({
              error: "There are no books with that name, gener or author",
            });
    } else {
      const allBooks = await getAllBooks();
      res.status(200).json(allBooks);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get Book by Id
const getBooksIdHandler = async (req, res) => {
  const { idBook } = req.params;
  try {
    const response = await getBookById(idBook);
    response === null
      ? res.status(400).json({ error: "There are no books with that id" })
      : res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Post Books
const postBooksHandler = async (req, res) => {
  const {
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
  } = req.body;
  try {
    const newBook = await postBook(
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
      genre
    );
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Put Books
const putBooksHandler = async (req, res) => {
  const { idBook } = req.params;

  const {
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
  } = req.body;

  try {
    console.log("entre al handler");
    await putBook(
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
    );
    res.status(200).json("Product updated succesfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete Books
const deleteBooksHandler = async (req, res) => {
  const { idBook } = req.params;

  try {
    await deleteBook(idBook);
    res.status(200).send("Product deleted succesfully 👌");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBooksHandler,
  getBooksIdHandler,
  postBooksHandler,
  putBooksHandler,
  deleteBooksHandler,
};
