const { Router } = require("express");
const { checkSchema } = require("express-validator");

const { billGetAllSchema } = require("../schemas/billSchema");
const { validateRequest } = require("../middleware/validateRequest");
const {
  getBillByIdHandler,
  getBillsHandler,
} = require("../handlers/billsHandler");

const BillsRouter = Router();

BillsRouter.get("/:id", getBillByIdHandler).get(
  "/",
  checkSchema(billGetAllSchema, ["query"]),
  validateRequest,
  getBillsHandler
);

module.exports = BillsRouter;
