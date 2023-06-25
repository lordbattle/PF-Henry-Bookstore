const axios = require("axios");
const bcrypt = require("bcryptjs");
const { User, conn } = require("../db");
const { Op } = require("sequelize");
const { API_CLOUDINARY_USERS_UPLOAD_PRESET } = process.env;

const { cloudinary } = require("../services/cloudinaryService");

    

    //------|  PUT/  |---------->
    const putUser = async (id, updatedData) => {
      try {
        const user = await User.findByPk(+id);
    
        if (!user) {
          throw Error("There is no user with the specified id");
        }
    
        const { email, ...rest } = updatedData;
    
        if (email) {
          const salt = bcrypt.genSaltSync();
          const hashedEmail = bcrypt.hashSync(email, salt);
          user.email = hashedEmail;
        }
    
        Object.assign(user, rest);
        await user.save();
    
        return user;
      } catch (e) {
        throw Error(e.message);
      }
    };
      
     //------|  deleteUser/:id  |---------->
    const deleteUser = async (id) => {
      try {
        const user = await User.findByPk(+id);
    
        if (!user) {
          throw Error("There is no user with the specified id");
        }
    
        user.active = false;
        await user.save();
    
        return user;
      } catch (e) {
        throw Error(e.message);
      }
    };
    



    module.exports = {
      getAllUsers,
      getUserById,
      registerUser,
      putUser,
      deleteUser
      
    };








