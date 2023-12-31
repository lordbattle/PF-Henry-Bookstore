require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT, DB_PORT } =
  process.env;

const sequelize = new Sequelize(
  `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Author, Book, Genre, ReviewStore, User, Order, OrderItem, Bill } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Book.belongsTo(Author, { through: "Book_Author" });
// Author.belongsToMany(Book, { through: "Book_Author" });

// Book.belongsTo(Genre, { through: "Book_Genre" });
// Genre.belongsToMany(Book, { through: "Book_Genre" });

// User.belongsTo(Book, { through: "User_Book" });
// Book.belongsToMany(User, { through: "User_Book" });
User.hasMany(Book, { foreignKey: "userId" });
Book.belongsTo(User, { foreignKey: "userId" });

// Order and Bill relations
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Book.hasMany(OrderItem, { foreignKey: "bookId" });
OrderItem.belongsTo(Book);

User.hasMany(Bill, { foreignKey: "userId" });
Bill.belongsTo(User);

Order.hasOne(Bill, { foreignKey: "orderId" });
Bill.belongsTo(Order);

// ReviewStore relations
Book.hasMany(ReviewStore, { foreignKey: "bookId" });
ReviewStore.belongsTo(Book);

User.hasMany(ReviewStore, { foreignKey: "userId" });
ReviewStore.belongsTo(User);

OrderItem.hasOne(ReviewStore, { foreignKey: "orderItemId" });
ReviewStore.belongsTo(OrderItem);

module.exports = {
  // Author,
  // Book,
  // Genre,
  // ReviewStore,
  // User, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  ...sequelize.models,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
