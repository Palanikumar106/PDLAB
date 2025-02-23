const mysqlConnection = require('../../config/mysqlConfig');
const getHeadId = require('../../miscellaneous/getHeadId');

const ledgerController = async (req, res) => {
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

module.exports = ledgerController;
