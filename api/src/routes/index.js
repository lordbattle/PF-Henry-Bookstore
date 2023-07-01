const { Router } = require("express");
const BooksRouter = require("./booksRouter");
const UsersRouter = require("./usersRouter");
const GendersRouter = require("./gendersRouter");
const AuthorsRouter = require("./authorsRouter");
const AuthRouter = require("./authRoutes");
const ProfileRouter = require("./profileRoutes");
const OrdersRouter = require("./ordersRouter");
const { createAccessToken } = require("../helpers/createAccesToken");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//mainRouter.use("/authUser", AuthRouter);
mainRouter.use("/profileUser", createAccessToken, ProfileRouter);
mainRouter.use("/users", UsersRouter);
mainRouter.use("/books", BooksRouter);
mainRouter.use("/orders", OrdersRouter);

/* mainRouter.use("/genders", GendersRouter);
mainRouter.use("/authors", AuthorsRouter); */

module.exports = mainRouter;
