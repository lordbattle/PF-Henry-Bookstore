const {
  getAllAuthors,
  getAuthorBytitle,
  getAuthorById,
} = require("../controllers/authorsControllers");

const getAuthorHandler = (req, res) => {
  try {
    res.status(200).send("hola");
  } catch (error) {
    res.status(400).send("error");
  }
};

//Get author by Id
const getAuthorIdHandler = (req, res) => {};

module.exports = {
  getAuthorHandler,
  getAuthorIdHandler,
};
