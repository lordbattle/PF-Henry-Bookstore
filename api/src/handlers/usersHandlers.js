const {
  getAllUsers,
  registerUser,
  getUserById,
  putUser,
  deleteUser,
  } = require("../controllers/usersControllers");
  const { typeUser, cleanData, defineOrder } = require("../helpers/userHelper");  
 

//Get All Users
const getUsersHandler = async (req, res) => {
  const name = req.query.name || "";
  const limit = +req.query.limit || 20;
  const page = req.query.page ? (+req.query.page-1) * limit : 0;  
  const sort = (req.query.sort && defineOrder(req.query.sort)) || [["id"]];
  const rol = (req.query.rol && [req.query.rol]) || [true, false];

  try {
    const results = await getAllUsers(name, page, limit, sort, rol);
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
    res.status(200).json({ success: true, results });
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

