const mysqlConnection = require('../../config/mysqlConfig');
const getHeadId = require('../../miscellaneous/getHeadId');

const addLedger = async (req, res) => {
    try {
        const { head_name, ledger_name } = req.body;

        if (!ledger_name) {
            return res.status(400).json({ error: "ledger_name is required" });
        }
        const head_id = await getHeadId(head_name)

        const query = 'INSERT INTO fees_ledger (ledger_id, head_id, ledger_name) VALUES (UUID(), ?, ?)';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [head_id, ledger_name], (err, result) => {
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
};

const getLedgerFields = async (req, res) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            const query = `SELECT l.ledger_name, h.Head_name 
FROM fees_ledger l 
JOIN fees_head h ON l.head_id = h.head_id;`

            mysqlConnection.query(query, (err, rows) => {
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


const deleteLedger = async (req, res) => {
    try {
        const { ledger_name } = req.body;
        if (!ledger_name) {
            return res.status(400).json({ error: "head_name are required" });
        }
        const query = 'delete from fees_ledger where ledger_name=?';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [ledger_name], (err, result) => {
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


const updateLedger = async (req, res) => {
    try {
        const { old_name, new_name } = req.body;
        if (!old_name || !new_name) {
            return res.status(400).json({ error: "Old_name And New_Name are required" });
        }
        const query = 'update fees_ledger set ledger_name=? where ledger_name=?';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [new_name, old_name], (err, result) => {
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

module.exports = {addLedger,getLedgerFields,deleteLedger,updateLedger};
