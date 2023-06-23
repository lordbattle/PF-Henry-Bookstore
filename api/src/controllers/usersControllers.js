const axios = require("axios");
require("dotenv").config();

const { User, Book, Genre, Author, ReviewStore } = require("../db");
















//------|  POST/  |---------->   
const postUser = async (
      userName, 
      email, 
      password, 
      age, 
      lacation, 
      genres, 
      phone, 
      profilePic, 
      active, 
      banned, 
      admin, 
      googleUser, 
      firstLogin, 
      notifications 
    ) =>{
    
     // si ya existe arroja error
    const userExists = await User.findOne({where: {userName}});
    if(userExists) throw Error('this username already exists in the DB');

   //creamos la tabla 
   const newUser = await User.create({userName, email, password, age, lacation, genres, phone, profilePic, active, banned, admin, googleUser, firstLogin, notifications});
   
     
   return newUser;
  
  }

    

    //------|  PUT/  |---------->
     const putUser = async (id, updatedData) => {
    const {
         userName, 
         email, 
         password, 
         age, 
         lacation,
         genres, 
         phone, 
         profilePic, 
         active, 
         banned, 
         admin, 
         googleUser, 
         firstLogin, 
         notifications 
        } = updatedData;
    
    // chekeamos si el usuario existe
    const user = await User.findByPk(id);
    if (!user) throw Error('User not found');
  
    // actualizamos datos del usuario
    user.userName = userName;
    user.email = email;
    user.password = password;
    user.age = age;
    user.lacation = lacation;
    user.genres = genres;
    user.phone = phone;
    user.profilePic = profilePic;
    user.active = active;
    user.banned = banned;
    user.admin = admin;
    user.googleUser = googleUser;
    user.firstLogin = firstLogin;
    user.notifications = notifications;
  
    // guardamos la actualizacion 
    await user.save();
  
    return user;
  }

    

    //------|  DELETE/:id  |----------> 
  const deleteUser = async(id) => {
    const toDelete= await User.findByPk(id);
    if(!toDelete) return "user not found";
    await toDelete.destroy();

    return "Dog deleted successfully";

   }



   module.exports={
    
      postUser,    
      putUser,
      deleteUser      
   }



/*getUsers,
getUserById,*/




