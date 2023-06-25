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
        allowNull: false,
      },
      bookPic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
      },
      currencyCode: {
        type: DataTypes.STRING,
        defaultValue: "$",
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: function () {
          return Math.floor(Math.random() * (30000 - 1000 + 1)) + 1000;
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
    },
    { timestamps: false }
  );
};
