const { cleanData } = require("../helpers/userHelper");
const { typeGetAllReviewStoreBody } = require("../helpers/reviewStoreHelper");
const { insertReviewStore } = require("../controllers/reviewStoreController");

const postReviewStoreHandler = async (req, res) => {
  try {
    const data = cleanData(typeGetAllReviewStoreBody, req.body);

    const results = await insertReviewStore(data);
    console.log("results", results)
    res.status(200).json({ success: true, results });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = {
  postReviewStoreHandler,
};
