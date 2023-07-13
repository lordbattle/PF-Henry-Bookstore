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
  const { id_user, items, expiration_date_from, expiration_date_to } = req.body;

  try {
    // Validar los campos de fecha y hora
    const dateFromPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-\d{2}:\d{2}$/;
    const dateToPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-\d{2}:\d{2}$/;

    if (!dateFromPattern.test(expiration_date_from) || !dateToPattern.test(expiration_date_to)) {
      throw new Error("Invalid date format");
    }

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
    const { status, expiration_date_from, expiration_date_to } = req.body;

    // Validar los campos de fecha y hora
    const dateFromPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-\d{2}:\d{2}$/;
    const dateToPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-\d{2}:\d{2}$/;

    if ((expiration_date_from && !dateFromPattern.test(expiration_date_from)) ||
        (expiration_date_to && !dateToPattern.test(expiration_date_to))) {
      throw new Error("Invalid date format");
    }

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
