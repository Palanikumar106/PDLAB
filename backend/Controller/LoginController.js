const mysqlConnection = require('../config/mysqlConfig');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const LoginController = (req, res) => {
    const { email, dob } = req.body;

    if (!email || !dob) {
        return res.status(400).json({ message: 'Email and Date of Birth are required' });
    }

    const isAdmin = email.toLowerCase().startsWith("admin");
    const role = isAdmin ? "admin" : "student";

    const query = isAdmin
        ? 'SELECT email AS id FROM users WHERE email= ? AND dob = ?'
        : 'SELECT Student_id as id FROM student_information WHERE Student_id = ? AND dob = ?';

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
        const token = jwt.sign(
            { email: user.id, role },
            process.env.SECRET_KEY || 'default_secret',
            { expiresIn: '1h' }
        );

        res.json({ token, role,email });
    });
};

module.exports = LoginController;
