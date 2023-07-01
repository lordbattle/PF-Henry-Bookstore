const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      invoiceStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferenceId: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
    { sequelize, modelName: "orderItem" }
  );
};
