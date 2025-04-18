const mysqlConnection = require('../../config/mysqlConfig');

const studentDetails = async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT * FROM student_information', (err, rows) => {
                if (err) {
                    reject(new Error("Query execution failed"));
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length === 0) {
            return res.status(404).json({ error: "No students found" });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const studentByID = async (req, res) => {
    const student_id = req.params.id;

    // Access decoded token info (injected by verifyToken middleware)
    const userId = req.user?.email;

    // Check if logged-in student is requesting their own data OR is admin
    if (userId != student_id) {
        return res.status(403).json({ message: "Access Denied: You can only access your own data" });
    }

    try {
        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(
                'SELECT * FROM student_information WHERE student_id = ?',
                [student_id],
                (err, rows) => {
                    if (err) {
                        reject(new Error("Query execution failed"));
                    } else {
                        resolve(rows);
                    }
                }
            );
        });

        if (rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { studentDetails, studentByID };
