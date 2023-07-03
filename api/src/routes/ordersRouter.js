const { Router } = require("express");
const {
  postOrderdHandler,
  postReceiveWebhook,
} = require("../handlers/ordersHandlers");

const OrdersRouter = Router();

OrdersRouter.post("/webhook", postReceiveWebhook).post("/", postOrderdHandler);

module.exports = OrdersRouter;
