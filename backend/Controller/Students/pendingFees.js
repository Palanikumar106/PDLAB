const db = require("../../config/mysqlConfig");

const pendingFees = async (req, res) => {
  console.log("Incoming request for pending fees");

  const student_id = req.params.id;
  const loggedInId = req.user?.email;

  // Authorization Check
  if (loggedInId != student_id) {
    return res.status(403).json({ message: "Access Denied: You can only access your own fee data" });
  }

  try {
    const query = `
      SELECT f.student_id, f.fees_amount, l.ledger_name, f.Allotment_id
      FROM fees_allotment f
      JOIN fees_ledger l ON f.ledger_id = l.ledger_id
      WHERE f.student_id = ? AND f.feeStatus = 'pending'
    `;

    const rows = await new Promise((resolve, reject) => {
      db.query(query, [student_id], (err, rows) => {
        if (err) {
          console.error("Query Error:", err);
          reject(new Error("Query execution failed"));
        } else {
          console.log("Query Result:", rows);
          resolve(rows);
        }
      });
    });

    res.json(rows);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = pendingFees;
