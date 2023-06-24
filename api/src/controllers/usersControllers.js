const axios = require("axios");
const bcrypt = require("bcryptjs");
const { User, Book, Genre, Author, ReviewStore, conn } = require("../db");
const { Op } = require("sequelize");
const { API_CLOUDINARY_USERS_UPLOAD_PRESET } = process.env;

const { cloudinary } = require("../services/cloudinaryService");

const getAllUsers = async (name, page, limit, sort, rol) => {
  try {
    const count = await User.count({
      where: {
        userName: {
          [Op.iLike]: `%${name}%`,
        },
        admin: {
          [Op.in]: [...rol],
        },
      },
    });

    if (count === 0) return { count, results: [] };

    const results = await User.findAll({
      where: {
        userName: {
          [Op.iLike]: `%${name}%`,
        },
        admin: {
          [Op.in]: [...rol],
        },
      },
      limit,
      offset: page,
      order: [...sort],
    });

    return { count, results };
  } catch (e) {
    throw Error(e.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(+id);

    if (!user) throw Error("There is no user with the specified id");

    return user;
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

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
};
