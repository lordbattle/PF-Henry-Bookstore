const {
    
    putUser,
    deleteUser
  } = require("../controllers/usersControllers");
  const { typeUser, cleanData, defineOrder } = require("../helpers/userHelper");  
 
  
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
    res.status(200).json({ success: true, results });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
  
  module.exports = {
    
    putUsersHandler,
    deleteUsersHandler,
  };