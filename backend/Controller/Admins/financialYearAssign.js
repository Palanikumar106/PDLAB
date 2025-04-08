const mysqlConnection = require('../../config/mysqlConfig');

// CREATE (POST) - Insert a new financial year
const createYear = async (req, res) => {
    try {
        const { accountName, acronym, start, end } = req.body;
        if (!accountName || !acronym || !start || !end) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const query = 'INSERT INTO financial_year (accountName, acronym, start, end) VALUES (?, ?, ?, ?)';
        mysqlConnection.query(query, [accountName, acronym, start, end], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to insert record" });
            }
            res.json({ message: "Record inserted", id: result.insertId });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// READ (GET) - Fetch all financial years
const getYears = async (req, res) => {
    try {
        const query = 'SELECT * FROM financial_year';
        mysqlConnection.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Failed to fetch records" });
            }
            res.json(results);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// READ (GET by ID) - Fetch a specific financial year by year_id
const getYearById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM financial_year WHERE year_id = ?';
        mysqlConnection.query(query, [id], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ error: "Record not found" });
            }
            res.json(results[0]);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// UPDATE (PUT) - Update a financial year by ID
const updateYear = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountName, acronym, start, end } = req.body;

        if (!accountName || !acronym || !start || !end) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const query = 'UPDATE financial_year SET accountName=?, acronym=?, start=?, end=? WHERE year_id=?';
        mysqlConnection.query(query, [accountName, acronym, start, end, id], (err, result) => {
            if (err || result.affectedRows === 0) {
                return res.status(400).json({ error: "Update failed or record not found" });
            }
            res.json({ message: "Record updated successfully" });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// DELETE - Remove a financial year by ID
const deleteYear = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM financial_year WHERE year_id = ?';
        mysqlConnection.query(query, [id], (err, result) => {
            if (err || result.affectedRows === 0) {
                return res.status(400).json({ error: "Delete failed or record not found" });
            }
            res.json({ message: "Record deleted successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createYear, getYears, getYearById, updateYear, deleteYear };
