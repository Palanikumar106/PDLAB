const express = require("express");
const app = express.Router();
const {
  studentDetails,
  studentByID,
} = require("../../Controller/Students/studentDetails");
const pendingFees = require("../../Controller/Students/pendingFees");
const transactionHistory = require("../../Controller/Students/transactionHistory");
app.get("/details", studentDetails);
app.get("/details/:id", studentByID);
app.get("/pending-fees/:id", pendingFees);
app.get("/transactions/:student_id", transactionHistory);
module.exports = app;
