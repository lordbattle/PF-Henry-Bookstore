const {
  insertOrder,
  receiveWebhook,
} = require("../controllers/ordersControllers");
const { sendPurchase } = require("../config/mailer");
const { rejectExpiredOrdersJob } = require("../jobs/OrdersJob");

rejectExpiredOrdersJob.start();

//Post Orders
const postOrderdHandler = async (req, res) => {
  const { id_user, items, total } = req.body;

  try {
    const results = await insertOrder(id_user, items, total);

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

module.exports = {
  postOrderdHandler,
  postReceiveWebhook,
};