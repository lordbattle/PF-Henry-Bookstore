const {
  saveAllBooksDb,
  getAllBooks,
  getBooksBytitle,
  getBookById,
  postBook,
  putBook,
  deleteBook,
} = require("../controllers/booksControllers");

//Save API data in the DB
//saveAllBooksDb();

const getBooksHandler = async (req, res) => {
  const { title, order , page , limit , price } = req.query;
  try {
    if (title) {
      const bookByName = await getBooksBytitle(title, order , page, limit , price);
      bookByName.length > 0
        ? res.status(200).json(bookByName)
        : res.status(404).json({ error: "There are no books with that name" });
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
    identifier,
    bookPic,
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
      identifier,
      bookPic,
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
    res.status(200).send("product deleted succesfully 👌");
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
