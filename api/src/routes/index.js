const { Router } = require("express");
const BooksRouter = require("./booksRouter");
const UsersRouter = require("./usersRouter");
const AuthRouter = require("./authRoutes");
const ProfileRouter = require("./profileRoutes");
const OrdersRouter = require("./ordersRouter");
const BillsRouter = require("./billsRouter");
const ReviewStoreRouter = require("./reviewStoreRouter");
const { validateToken } = require("../middleware/validateToken");

const mainRouter = Router();

mainRouter.use("/authUser", AuthRouter);
mainRouter.use("/profileUser", ProfileRouter);
mainRouter.use("/users", UsersRouter);
mainRouter.use("/books", BooksRouter);
mainRouter.use("/orders", OrdersRouter);
mainRouter.use("/bills", BillsRouter);
mainRouter.use("/reviewStore", ReviewStoreRouter);

module.exports = mainRouter;
