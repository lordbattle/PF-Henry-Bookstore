const { Router } = require("express");
<<<<<<< HEAD:api/src/index.js
const BooksRouter = require("./routes/booksRouter");
const UsersRouter = require("./routes/usersRouter");
const GendersRouter = require("./routes/gendersRouter");
const AuthorsRouter = require("./routes/authorsRouter");
const AuthRouter = require("./routes/authRoutes");
const ProfileRouter = require("./routes/profileRoutes");
const OrdersRouter = require("./routes/ordersRouter");
const { createAccessToken } = require("./helpers/createAccesToken");
=======
const GendersRouter = require("./gendersRouter");
const AuthorsRouter = require("./authorsRouter");
const BooksRouter = require("./booksRouter");
const UsersRouter = require("./usersRouter");
const AuthRouter = require("./authRoutes");
const ProfileRouter = require("./profileRoutes");
const OrdersRouter = require("./ordersRouter");
const {validateToken} = require("../middleware/validateToken");
//const { validateToken } = require("../middleware/validateToken");
>>>>>>> 1e887b7aa7bd5207292481848751f19b85f382ca:api/src/routes/index.js
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
