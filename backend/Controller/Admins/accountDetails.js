
const mysqlConnection = require('../../config/mysqlConfig')
const accountController = async(req, res) => {
    try {
        const { paymentMode,accountNumber } = req.body;
        if (!accountNumber || !paymentMode) {
            return res.status(400).json({ error: "Account Details are required" });
        }
        const query = 'INSERT INTO account_details (account_id,paymentMode,accountNumber) VALUES (UUID(),?, ?)';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [paymentMode, accountNumber], (err, result) => {
                if (err) {
                    reject(new Error("Query execution failed"));
                } else {
                    resolve("Records Inserted");
                }
            });
        });

        res.json({ message: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
module.exports = accountController;