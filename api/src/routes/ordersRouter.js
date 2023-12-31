const { Router } = require("express");
const { checkSchema } = require("express-validator");

const {
  orderGetAllSchema,
  orderPostSchema,
} = require("../schemas/orderSchema");
const { validateRequest } = require("../middleware/validateRequest");
const {
  getOrderByIdHandler,
  getOrdersHandler,
  postOrderdHandler,
  postReceiveWebhook,
  putOrderStatusHnadler
} = require("../handlers/ordersHandlers");

const OrdersRouter = Router();

OrdersRouter.get("/:id", getOrderByIdHandler)
  .get(
    "/",
    checkSchema(orderGetAllSchema, ["query"]),
    validateRequest,
    getOrdersHandler
  )
  .post("/webhook", postReceiveWebhook)
  .post(
    "/",
    //checkSchema(orderPostSchema, ["body"]),
    //validateRequest,
    postOrderdHandler
  ).put("/:idItem", putOrderStatusHnadler);;

module.exports = OrdersRouter;
