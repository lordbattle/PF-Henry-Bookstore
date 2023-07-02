const { Router } = require("express");
const GendersRouter = require("./gendersRouter");
const AuthorsRouter = require("./authorsRouter");
const BooksRouter = require("./booksRouter");
const UsersRouter = require("./usersRouter");
const AuthRouter = require("./authRoutes");
const ProfileRouter = require("./profileRoutes");
const OrdersRouter = require("./ordersRouter");
const {validateToken} = require("../middleware/validateToken");
//const { validateToken } = require("../middleware/validateToken");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/authUser", AuthRouter);
mainRouter.use("/profileUser", validateToken, ProfileRouter);
mainRouter.use("/users", UsersRouter);
mainRouter.use("/books", validateToken, BooksRouter);
mainRouter.use("/orders", OrdersRouter);

/* mainRouter.use("/genders", GendersRouter);
mainRouter.use("/authors", AuthorsRouter); */

module.exports = mainRouter;
