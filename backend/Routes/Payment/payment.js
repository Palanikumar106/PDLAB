const express = require("express");
const PaymentController = require("../../Controller/Payment/paymentController");

const payment = express.Router();

payment.post("/student/pay-fees", PaymentController.initializePayment);
payment.post("/student/save-transaction", PaymentController.saveTransaction);
module.exports = payment;
