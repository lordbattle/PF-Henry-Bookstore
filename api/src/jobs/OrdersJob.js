const cron = require("node-cron");

const { rejectExpiredOrders } = require("../controllers/ordersControllers");

const rejectExpiredOrdersJob = cron.schedule(
  "0 1 * * * *",
  () => {
    rejectExpiredOrders();
  },
  {
    timezone: "America/Buenos_Aires",
  }
);

module.exports = {
  rejectExpiredOrdersJob,
};
