const express = require('express')
const app = express.Router()
const {studentDetails, studentByID}=require('../../Controller/Students/studentDetails');
const pendingFees = require('../../Controller/Students/pendingFees');
app.get('/details',studentDetails);
app.get('/details/:id',studentByID);
app.get('/pending-fees/:id',pendingFees)

module.exports = app;
