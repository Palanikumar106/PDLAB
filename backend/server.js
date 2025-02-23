// index.js
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const studentProfile=require('./Routes/Student/studentProfile')
const financialYear=require('./Routes/Admin/financialYear')
const payment=require('./Routes/Payment/payment')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.use('/api/students',studentProfile)
app.use('/api/admin',financialYear)
app.use('/api',payment);

app.listen(3000,()=>{
    console.log("Server Connected")
})