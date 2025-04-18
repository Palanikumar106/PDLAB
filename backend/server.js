// index.js
require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const studentProfile=require('./Routes/Student/studentProfile')
const financialYear=require('./Routes/Admin/financialYear')
const payment=require('./Routes/Payment/payment')
const login=require('./Routes/Login')
const cors=require('cors')
const app=express()
const db = require('./config/mysqlConfig');

app.get("/api/dashboard-stats", (req, res) => {
    const stats = {};
    const queries = [
        ["SELECT COUNT(*) AS totalStudents FROM student_information", "totalStudents"],
        ["SELECT SUM(amount) AS totalRevenue FROM transaction", "totalRevenue"],
        ["SELECT COUNT(*) AS transactions FROM transaction", "transactions"],
       // ["SELECT COUNT(*) AS issuesReported FROM issues_table", "issuesReported"],
        ["SELECT COUNT(*) AS unpaidStudents FROM fees_allotment WHERE feeStatus = 'pending'", "unpaidStudents"],
    ];

    let completed = 0;

    queries.forEach(([query, key]) => {
        db.query(query, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            stats[key] = result[0][key] ?? 0;
            completed++;

            if (completed === queries.length) {
                res.json(stats);
            }
        });
    });
});


app.get('/api/details/:type', (req, res) => {
    const { type } = req.params;

    console.log(type)

    let query = '';
    switch (type) {
        case 'students':
            query = 'SELECT * FROM student_information'; // or your students table
            break;
        case 'revenue':
            query = 'SELECT * FROM transaction'; // or your revenue table
            break;
        case 'transactions':
            query = 'SELECT * FROM transaction';
            break;
        case 'unpaid':
            query = "SELECT s.Student_Name, f.due_date FROM student_information s JOIN fees_allotment f ON s.Student_Id = f.student_id WHERE f.feeStatus = 'pending'";
            break;
        default:
            return res.status(400).json({ error: 'Invalid type' });
    }

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});



app.use(express.json())
app.use(cors())
app.use('/api/students',studentProfile)
app.use('/api/admin',financialYear)
app.use('/api',payment);
app.use('/api/login',login)

app.listen(3000,()=>{
    console.log("Server Connected")
})