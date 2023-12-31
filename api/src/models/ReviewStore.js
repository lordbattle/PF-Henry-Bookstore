const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reviewStore",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
