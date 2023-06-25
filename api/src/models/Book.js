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
      },
      publishedDate: {
        type: DataTypes.STRING,
      },
      publisher: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      pages: {
        type: DataTypes.INTEGER,
      },
      averageRating: {
        type: DataTypes.DOUBLE,
      },
      usersRating: {
        type: DataTypes.DOUBLE,
        defaultValue : 0 
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      identifier: {
        type: DataTypes.STRING,
      },
      bookPic: {
        type: DataTypes.STRING,
        defaultValue:
          "https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1411/tackgalichstudio141100020/33575659-s%C3%ADmbolo-de-libro-sobre-fondo-gris.jpg",
      }, 
      authors:{
        type : DataTypes.STRING,

      },
      genre:{
        type : DataTypes.STRING,
      } ,
      price :{
        type : DataTypes.INTEGER
      }   
    },
    { timestamps: false }
  );
};
