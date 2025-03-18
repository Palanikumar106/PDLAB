
const mysqlConnection = require('../../config/mysqlConfig')
const addAccount= async(req, res) => {
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



const getAccount = async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT * FROM account_details', (err, rows) => {
                if (err) {
                    reject(new Error("Query execution failed"));
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length === 0) {
            return res.status(404).json({ error: "No Fees Head found" });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}



const deleteAccount = async (req, res) => {
    try {
        const { accountNumber } = req.body;
        if (!accountNumber) {
            return res.status(400).json({ error: "Account NUmber are required" });
        }
        const query = 'delete from account_details where accountNumber=?';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [accountNumber], (err, result) => {
                if (err) {
                    reject(new Error("Query execution failed" + err));
                } else {
                    resolve("Records Deleted");
                }
            });
        });

        res.json({ message: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


const updateAccount = async (req, res) => {
    try {
        const { old_account, new_account } = req.body;
        if (!old_account || !new_account) {
            return res.status(400).json({ error: "Old_Account And New_Account are required" });
        }
        const query = 'update account_details set accountNumber=? where accountNumber=?';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [new_account, old_account], (err, result) => {
                if (err) {
                    reject(new Error("Query execution failed" + err));
                } else {
                    resolve("Records Updated");
                }
            });
        });

        res.json({ message: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}




module.exports = {addAccount,getAccount,deleteAccount,updateAccount};