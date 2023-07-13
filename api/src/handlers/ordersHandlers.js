const {
  getOrderById,
  getAllOrders,
  insertOrder,
  receiveWebhook,
  putStatusOrder,
} = require("../controllers/ordersControllers");
const { cleanData } = require("../helpers/userHelper");
const { typeGetAllOrdersParams } = require("../helpers/orderHelper");
const { sendPurchase } = require("../config/mailer");
const { rejectExpiredOrdersJob } = require("../jobs/OrdersJob");

rejectExpiredOrdersJob.start();

// Get order by id
const getOrderByIdHandler = async (req, res) => {
  try {
    const results = await getOrderById(req.params.id);

    res.status(200).json({ success: true, results });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

// Get all orders
const getOrdersHandler = async (req, res) => {
  try {
    const data = cleanData(typeGetAllOrdersParams, req.query);

    const results = await getAllOrders(data);

    res.status(200).json({ success: true, results });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

//Post Orders
const postOrderdHandler = async (req, res) => {
  const { id_user, items } = req.body;

  try {
    const results = await insertOrder(id_user, items);

    res.status(200).json({ success: true, results });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const postReceiveWebhook = async (req, res) => {
  try {
    const results = await receiveWebhook(req.query);

    if (results?.email) {
      //await sendPurchase(results.email);
    }

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: e.message });
  }
};

const putOrderStatusHnadler = async (req, res) => {
  try {
    const { idItem } = req.params;
    const { status } = req.body;

    const result = await putStatusOrder(idItem, status);

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getOrderByIdHandler,
  getOrdersHandler,
  postOrderdHandler,
  postReceiveWebhook,
  putOrderStatusHnadler,
};
