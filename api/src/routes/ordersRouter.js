const { Router } = require("express");
const { checkSchema } = require("express-validator");

const { orderNewSchema } = require("../schemas/orderSchema");
const { validateRequest } = require("../middleware/validateRequest");
const {
  postOrderdHandler,
  postReceiveWebhook,
} = require("../handlers/ordersHandlers");

const OrdersRouter = Router();

OrdersRouter.post("/webhook", postReceiveWebhook).post(
  "/",
  checkSchema(orderNewSchema),
  validateRequest,
  postOrderdHandler
);

module.exports = OrdersRouter;
