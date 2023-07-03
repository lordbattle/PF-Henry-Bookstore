const {
  getAllUsers,
  registerUser,
  getUserById,

  putUser,
  deleteUser,
} = require("../controllers/usersControllers");
const { typeUser, cleanData, defineOrder } = require("../helpers/userHelper");
const { sendNewUserEmail } = require("../config/mailer");

//Get All Users
const getUsersHandler = async (req, res) => {
  const name = req.query.name || "";
  const limit = +req.query.limit || 20;
  const page = req.query.page ? (+req.query.page - 1) * limit : 0;
  const sort = (req.query.sort && defineOrder(req.query.sort)) || [["id"]];
  const rol = (req.query.rol && [req.query.rol]) || [true, false];

  const active = req.query.active;

  try {
    const results = await getAllUsers(name, page, limit, sort, rol, active);
    res.status(200).json({ success: true, results });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

//GET USER BY STATUS
/* const getUsersByStatus = async(req,res)=> {
   const {active} = req.query;

   console.log(active);
  try {
    const result = await findUserStatus(active)

    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json(error.message)
  }
} */

//GET USER BY userName
/* const getUsersByName = async (req, res) => {
  const { username } = req.query;

  try {
    const result = await findUserName(username);

    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

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
