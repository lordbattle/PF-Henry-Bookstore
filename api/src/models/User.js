const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        uniquie: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        uniquie: true,
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 18,
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
      },
      genres: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
      },
      profilePic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://firebasestorage.googleapis.com/v0/b/henry-book-explorer.appspot.com/o/image?alt=media&token=3dccc098-e2c1-48ab-9539-ce0024b12996",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      googleUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notifications: {
        type: DataTypes.JSON,
      },
      securityQuestion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
