const { Op } = require("sequelize");
const moment = require("moment");

const findDate = (value) => {
  const startDate = moment(value).format();
  const finalDate = moment(value).add(24, "hours").format();

  return { [Op.between]: [startDate, finalDate] };
};

module.exports = {
  findDate,
};
