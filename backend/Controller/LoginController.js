const mysqlConnection = require('../config/mysqlConfig')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const LoginController = (req, res) => {
    const { email, dob } = req.body;

    if (!email || !dob) {
        return res.status(400).json({ message: 'Email and Date of Birth are required' });
    }

    const query = 'SELECT email, role FROM users WHERE email = ? AND dob = ?';
    mysqlConnection.query(query, [email, dob], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];

        // Generate JWT Token
        //console.log("hi",process.env.SECRET_KEY)
        const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.SECRET_KEY || 'default_secret',
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    });
};

module.exports =LoginController;
