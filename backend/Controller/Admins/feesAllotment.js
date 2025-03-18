const mysqlConnection = require('../../config/mysqlConfig');
const getHeadId = require('../../miscellaneous/getHeadId');
const getLedgerId = require('../../miscellaneous/getLedgerId');
const { promisify } = require('util');

const queryAsync = promisify(mysqlConnection.query).bind(mysqlConnection);

const feesAllotController = async (req, res) => {
    try {
        const { student_id, Head_name, ledger_name, fees_amount, alloted_date, due_date, fine_amount, due_extend1, fine_extend1, due_extend2, fine_extend2, due_extend3, fine_extend3, due_extend4, fine_extend4 } = req.body;

        if (!student_id || !Head_name || !ledger_name || fees_amount == null || !alloted_date || !due_date || fine_amount == null) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        if (isNaN(fees_amount) || isNaN(fine_amount)) {
            return res.status(400).json({ error: "fees_amount and fine_amount must be numeric values" });
        }

        const head_id = await getHeadId(Head_name);
        const ledger_id = await getLedgerId(ledger_name);

        if (!head_id || !ledger_id) {
            return res.status(400).json({ error: "Invalid head_name or ledger_name" });
        }

        const checkQuery = `SELECT COUNT(*) AS count FROM fees_allotment WHERE student_id = ? AND head_id = ? AND ledger_id = ?`;
        const checkResult = await queryAsync(checkQuery, [student_id, head_id, ledger_id]);

        if (checkResult[0].count > 0) {
            return res.status(409).json({ error: "Fees allotment for this student already exists" });
        }

        const total_amount = parseFloat(fees_amount) + parseFloat(fine_amount);

        const query = `
            INSERT INTO fees_allotment 
            (Allotment_Id, student_id, ledger_id, head_id, fees_amount, total_amount, alloted_date, due_date, fine_amount, isPaid, due_extend1, fine_extend1, due_extend2, fine_extend2, due_extend3, fine_extend3, due_extend4, fine_extend4) 
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await queryAsync(query, [student_id, ledger_id, head_id, fees_amount, total_amount, alloted_date, due_date, fine_amount, due_extend1 || null, fine_extend1 || 0, due_extend2 || null, fine_extend2 || 0, due_extend3 || null, fine_extend3 || 0, due_extend4 || null, fine_extend4 || 0]);

        res.status(201).json({ message: "Fees allotment created successfully" });

    } catch (err) {
        console.error("Error in feesAllotController:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

module.exports = feesAllotController;
