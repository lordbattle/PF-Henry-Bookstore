 const mercadopago = require("mercadopago");

const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_ACCESS_TOKEN,
});

module.exports = {
  mercadopago,
}; 
