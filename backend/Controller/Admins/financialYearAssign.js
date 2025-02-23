const mysqlConnection = require('../../config/mysqlConfig');

const yearController = async (req, res) => {
    try {
        const { year } = req.body;
        if ( !year) {
            return res.status(400).json({ error: "year_id and year are required" });
        }
        const query = 'INSERT INTO financial_year (year_id,year) VALUES (UUID(),?)';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [year], (err, result) => {
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

module.exports = yearController;
