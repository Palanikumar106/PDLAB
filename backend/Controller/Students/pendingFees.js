const db = require("../../config/mysqlConfig");

const pendingFees = async (req, res) => {
  console.log(" Incoming request for pending fees");

  const student_id = req.params.id;
  console.log("Received Student ID:", student_id);

  try {
    const query = `
      SELECT f.student_id, f.fees_amount, l.ledger_name
      FROM fees_allotment f
      JOIN fees_ledger l ON f.ledger_id = l.ledger_id
      WHERE f.student_id = ?
    `;

    console.log("Executing SQL Query:", query, "with ID:", student_id);

    const rows = await new Promise((resolve, reject) => {
      db.query(query, [student_id], (err, rows) => {
        if (err) {
          console.error(" Query Error:", err);
          reject(new Error("Query execution failed"));
        } else {
          console.log("Query Result:", rows);
          resolve(rows);
        }
      });
    });

    if (rows.length === 0) {
      console.log(" No pending fees found for student:", student_id);
      return res.status(404).json({ error: "No pending fees found" });
    }

    res.json(rows);
  } catch (err) {
    console.error(" Server Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = pendingFees;
