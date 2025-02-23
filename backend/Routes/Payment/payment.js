const express = require("express");
const PaymentController = require("../../Controller/payment/paymentController");

const payment = express.Router();

payment.post("/student/pay-fees", PaymentController.initializePayment);
payment.get("/student/save-transaction", PaymentController.saveTransaction);
module.exports = payment;
