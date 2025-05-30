const db = require("../../config/mysqlConfig");

const transactionHistory = async (req, res) => {
  const { student_id } = req.params;
  const loggedInId = req.user?.email;


  if (loggedInId != student_id) {
    return res.status(403).json({ message: "Access Denied: You can only view your own transaction history" });
  }

  try {
    db.query(
      `SELECT Transaction_Id, feestype, amount, transaction_time, feesName
       FROM transaction
       WHERE student_id = ?
       ORDER BY transaction_time DESC`,
      [student_id],
      (err, results) => {
        if (err) {
          console.error("Error fetching transactions:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "No transactions found for this student" });
        }

        res.json(results);
      },
    );
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = transactionHistory;
