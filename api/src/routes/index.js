const { Router } = require("express");
const BooksRouter = require("./booksRouter");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/users", );
mainRouter.use("/books", BooksRouter);



module.exports = mainRouter;
