const { Router } = require("express");
const BooksRouter = require("./routes/booksRouter");
const UsersRouter = require("./routes/usersRouter");
const GendersRouter = require("./routes/gendersRouter");
const AuthorsRouter = require("./routes/authorsRouter");
const AuthRouter = require("./routes/authRoutes");
const ProfileRouter = require("./routes/profileRoutes");
const OrdersRouter = require("./routes/ordersRouter");
const { createAccessToken } = require("./helpers/createAccesToken");
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
