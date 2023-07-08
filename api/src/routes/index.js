const { Router } = require("express");
const BooksRouter = require("./booksRouter");
const UsersRouter = require("./usersRouter");
const AuthRouter = require("./authRoutes");
const ProfileRouter = require("./profileRoutes");
const OrdersRouter = require("./ordersRouter");
const BillsRouter = require("./billsRouter");
const ChangePassRouter = require("./changePassRoutes");
const { validateToken } = require("../middleware/validateToken");

const mainRouter = Router();

mainRouter.use("/authUser", AuthRouter);
mainRouter.use("/profileUser", ProfileRouter);
mainRouter.use("/users", UsersRouter);
mainRouter.use("/books", BooksRouter);
mainRouter.use("/orders", OrdersRouter);
mainRouter.use("/bills", BillsRouter);
mainRouter.use("/changePassword", ChangePassRouter);

module.exports = mainRouter;

// const { Router } = require("express");
// const bcrypt = require("bcrypt");
// const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
// const { validateToken } = require("../middleware/validateToken");

// const BooksRouter = require("./booksRouter");
// const UsersRouter = require("./usersRouter");
// const AuthRouter = require("./authRoutes");
// const ProfileRouter = require("./profileRoutes");
// const OrdersRouter = require("./ordersRouter");
// const { User } = require("../db");

// const mainRouter = Router();

// mainRouter.use("/authUser", AuthRouter);
// mainRouter.use("/profileUser", ProfileRouter);
// mainRouter.use("/users", UsersRouter);
// mainRouter.use("/books", BooksRouter);
// mainRouter.use("/orders", OrdersRouter);

// // Route for changing password
// mainRouter.put("/profile/changePassword", validateToken, async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   try {
//     // Buscar el usuario por ID
//     const user = await User.findByPk(req.userId);

//     // Verificar si la contraseña actual coincide
//     const passwordMatch = await bcrypt.compare(currentPassword, user.password);

//     if (!passwordMatch) {
//       return res.status(400).json({ message: "Current password is incorrect" });
//     }

//     // Generar hash de la nueva contraseña
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Actualizar la contraseña del usuario
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password changed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to change password" });
//   }
// });

// module.exports = mainRouter;
