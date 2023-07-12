const { Router } = require("express");
const { checkSchema } = require("express-validator");

const { reviewStorePostSchema } = require("../schemas/reviewStoreSchema");
const { validateRequest } = require("../middleware/validateRequest");
const { postReviewStoreHandler } = require("../handlers/reviewStoreHandler");

const ReviewStoreRouter = Router();

ReviewStoreRouter.post(
  "/",
  checkSchema(reviewStorePostSchema, ["body"]),
  validateRequest,
  postReviewStoreHandler
);

module.exports = ReviewStoreRouter;
