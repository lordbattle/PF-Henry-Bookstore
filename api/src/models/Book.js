const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "book",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      subtitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      publishedDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      averageRating: {
        type: DataTypes.DOUBLE,
        defaultValue: function () {
          return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        },
      },
      usersRating: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      identifier: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: function () {
          return (
            Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
            1000000000000
          );
        },
      },
      bookPic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
      },
      currencyCode: {
        type: DataTypes.STRING,
        defaultValue: "USD",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: function () {
          return Math.floor(Math.random() * (30000 - 5 + 1)) + 5;
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: function () {
          return Math.floor(Math.random() * (101 - 0)) + 0;
        },
      },
      authors: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER, // o el tipo de dato correspondiente al id de User
       
        references: {
          model: 'users', // Nombre de la tabla de usuarios
          key: 'id' // Nombre de la columna de clave primaria en la tabla de usuarios
        }
      }
    },
    { timestamps: false }
  );
};
