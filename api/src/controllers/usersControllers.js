const axios = require("axios");
const bcrypt = require("bcryptjs");
const { User, Book, Genre, Author, ReviewStore, conn } = require("../db");
const { Op } = require("sequelize");
const { API_CLOUDINARY_USERS_UPLOAD_PRESET } = process.env;

const { cloudinary } = require("../services/cloudinaryService");
const {
  userFilterAndPagination,
} = require("../helpers/userFilterAndPagination");

const getAllUsers = async (
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
) => {
  try {
    const whereCondition = {};

    if (userName) {
      whereCondition.userName = {
        [Op.iLike]: `%${userName}%`,
      };
    }

    if (name) {
      whereCondition.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (lastName) {
      whereCondition.lastName = {
        [Op.iLike]: `%${lastName}%`,
      };
    }

    if (location) {
      whereCondition.location = {
        [Op.iLike]: `%${location}%`,
      };
    }

    if (genres) {
      whereCondition.genres = {
        [Op.iLike]: `%${genres}%`,
      };
    }

    if (active !== undefined) {
      whereCondition.active = active;
    }

    if (banned !== undefined) {
      whereCondition.banned = banned;
    }

    if (admin !== undefined) {
      whereCondition.admin = admin;
    }

    if (googleUser !== undefined) {
      whereCondition.googleUser = googleUser;
    }

    const count = await User.count({
      where: whereCondition,
    });

    if (count === 0) {
      return { count, results: [] };
    }

    /* const results = await User.findAll({
      where: whereCondition,
      limit,
      offset: page * limit,
      order: sort,
    }); */

    let userBySearch = await User.findAll({
      where: whereCondition,
    });

    if (orderUsername || orderName || orderEmail || page || limit)
      return userFilterAndPagination(
        userBySearch,
        orderUsername,
        orderName,
        orderEmail,
        page,
        limit
      );
    else {
      return userBySearch;
    }

    return { count, results };
  } catch (e) {
    throw new Error(e.message);
  }
};

const findUserStatus = async (active) => {
  try {
    console.log("controller", active);
    const statusBoolean = JSON.parse(active); // Convierte el parámetro en minúsculas antes de convertirlo en booleano

    const result = await User.findAll({
      where: {
        active: statusBoolean,
      },
      attributes: ["id", "userName"],
    });

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw Error("There is no user with the specified id");

    return user;
  } catch (e) {
    throw Error(e.message);
  }
};

const findUserName = async (userName) => {
  try {
    const userByname = await User.findOne({
      where: {
        userName: {
          [Op.iLike]: `%${userName}%`,
        },
      },
    });

    if (!userByname) throw Error("There is no user with the specified name");

    return userByname;
  } catch (e) {
    throw Error(e.message);
  }
};

const registerUser = async (data) => {
  //transaction creation
  const transaction = await conn.transaction();

  try {
    //validate user existence
    const user = await User.findOne(
      { where: { email: data.email } },
      { transaction }
    );

    if (user) {
      throw Error("There is a user with that email");
    }

    const { password, profilePic, ...rest } = data;

    //password encryption
    const salt = bcrypt.genSaltSync();
    const userPassword = bcrypt.hashSync(password, salt);

    //user insertion
    const newUser = await User.create(
      {
        ...rest,
        password: userPassword,
      },
      { transaction }
    );
    console.log(newUser, "newUser resgister userrr");

    //validation and update of the image for the user
    if (data.profilePic) {
      const { secure_url } = await cloudinary.uploader.upload(profilePic, {
        upload_preset: API_CLOUDINARY_USERS_UPLOAD_PRESET,
      });

      newUser.set({ profilePic: secure_url });

      await newUser.save();
    }

    //inserting the data if the whole process was successful
    await transaction.commit();

    //return the created user
    return newUser;
  } catch (e) {
    //undo the insertion of the data in case of error
    await transaction.rollback();
    throw Error(e.message);
  }
};

//------|  PUT/  |---------->
const putUser = async (id, updatedData) => {
  try {
    const { email, profilePic } = updatedData;

    if (email) {
      const salt = bcrypt.genSaltSync();
      const hashedEmail = bcrypt.hashSync(email, salt);
      updatedData.email = hashedEmail;
    }

    if (updatedData.profilePic) {
      const { secure_url } = await cloudinary.uploader.upload(profilePic, {
        upload_preset: API_CLOUDINARY_USERS_UPLOAD_PRESET,
      });

      updatedData.profilePic = secure_url;

      const [updatedRowsCount] = await User.update(updatedData, {
        where: { id: id },
      });

      if (updatedRowsCount[0] === 0) {
        throw new Error("There is no user with the specified id");
      }

      return updatedRowsCount;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

//------|  deleteUser/:id  |---------->
const deleteUser = async (idUsers) => {
  try {
    const user = await User.findByPk(idUsers);

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
  findUserStatus,
  findUserName,
  putUser,
  deleteUser,
};
