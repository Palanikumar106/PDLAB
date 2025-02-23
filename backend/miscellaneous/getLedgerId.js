const mysqlConnection = require('../config/mysqlConfig')
const getLedgerId = async (ledger_name) => {
    const ledger_id = await new Promise((resolve, reject) => {
        const getId = `SELECT ledger_id FROM fees_ledger WHERE ledger_name = ?`;
        mysqlConnection.query(getId, [ledger_name], (err, result) => {
            if (err) {
                reject(new Error("Query execution failed"));
            } else {
                if (result.length === 0) {
                    reject(new Error("Invalid ledger_name not found"));
                } else {
                    resolve(result[0].ledger_id);
                }
            }
        }); 
    });
    return ledger_id;
}
module.exports = getLedgerId;