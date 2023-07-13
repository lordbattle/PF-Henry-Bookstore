const {
  getAllUsers,
  getUserById,
  registerUser,
  putUser,
  deleteUser,
} = require("../controllers/usersControllers");
const { typeUser, cleanData, defineOrder } = require("../helpers/userHelper");
const { sendNewUserEmail } = require("../config/mailer");

//Get All Users
const getUsersHandler = async (req, res) => {
  const limit = req.query.limit || 20;
  const page = req.query.page || 1;

  const {
    userName,
    name,
    lastName,
    location,
    genres,
    active,
    banned,
    admin,
    googleUser,
    orderUsername,
    orderName,
    orderEmail,
  } = req.query;

  try {
    const results = await getAllUsers(
      userName,
      name,
      lastName,
      location,
      genres,
      active,
      banned,
      admin,
      googleUser,
      orderUsername,
      orderName,
      orderEmail,
      page,
      limit
    );
    res.status(200).json({ success: true, results });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

//Get Users by Id
const getUsersIdHandler = async (req, res) => {
  const { idUsers } = req.params;

  try {
    const results = await getUserById(idUsers);
    res.status(200).json({ success: true, results });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

//Post Users
const postUsersIdHandler = async (req, res) => {
  const data = cleanData(typeUser, req.body);

  try {
    const results = await registerUser(data);
    console.log(results, " results post userrrr ");

    const emailSent = await sendNewUserEmail(results.email, results.userName);
    res.status(200).json({ success: true, results, emailSent });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

//Put Users
const putUsersHandler = async (req, res) => {
  const { idUsers } = req.params;
  const updatedData = cleanData(typeUser, req.body);

  try {
    const results = await putUser(idUsers, updatedData);
    res.status(200).json({ success: true, results });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// Delete Users
const deleteUsersHandler = async (req, res) => {
  const { idUsers } = req.params;

  try {
    const results = await deleteUser(idUsers);
    res.status(200).send("User deleted successfully");
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = {
  getUsersHandler,
  getUsersIdHandler,
  postUsersIdHandler,
  putUsersHandler,
  deleteUsersHandler,
};
