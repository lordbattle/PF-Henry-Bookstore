const {
  getAllGender,
  getGenderBytitle,
  getGenderById,
} = require("../controllers/gendersController");

const getGenderHandler = (req, res) => {
  try {
    res.status(200).send("hola");
  } catch (error) {
    res.status(400).send("error");
  }
};

//Get gender by Id
const getGenderIdHandler = (req, res) => {};

module.exports = {
  getGenderHandler,
  getGenderIdHandler,
};
