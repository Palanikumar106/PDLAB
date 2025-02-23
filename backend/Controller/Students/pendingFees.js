const mysqlConnection = require('../../config/mysqlConfig');

const pendingFees = async (req, res) => {
    const student_id = req.params.id;
    try {
        const rows = await new Promise((resolve, reject) => {
            const query = `SELECT f.student_id, f.fees_amount, l.ledger_name
    FROM fees_allotment f
    JOIN fees_ledger l ON f.ledger_id = l.ledger_id
    WHERE f.student_id = ?`;
            mysqlConnection.query(query,[student_id], (err, rows) => {
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

module.exports=pendingFees;