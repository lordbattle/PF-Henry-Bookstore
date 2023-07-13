const { cleanData } = require("../helpers/userHelper");
const { typeGetAllOrdersQuery } = require("../helpers/billHelper");
const { getBillById, getAllBills,putStatusOrder } = require("../controllers/billsController");

// Get bill by id
const getBillByIdHandler = async (req, res) => {
  try {
    const results = await getBillById(req.params.id);

    res.status(200).json({ success: true, results });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

// Get all bills
const getBillsHandler = async (req, res) => {
  try {
    const data = cleanData(typeGetAllOrdersQuery, req.query);

    const results = await getAllBills(data);

    res.status(200).json({ success: true, results });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};


module.exports = {
  getBillByIdHandler,
  getBillsHandler,
};
