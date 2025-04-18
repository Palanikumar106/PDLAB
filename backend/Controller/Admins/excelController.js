const xlsx = require("xlsx");
const mysqlConnection = require('../../config/mysqlConfig');
const getHeadId = require("../../miscellaneous/getHeadId");
const getLedgerId = require("../../miscellaneous/getLedgerId");
const { promisify } = require('util');

const queryAsync = promisify(mysqlConnection.query).bind(mysqlConnection);

const formatExcelDate = (excelDate) => {
    if (!excelDate) return null;
    const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
    return jsDate.toISOString().split("T")[0];
};

const cleanRowKeys = (row) => {
    const cleaned = {};
    for (let key in row) {
        cleaned[key.trim()] = row[key];
    }
    return cleaned;
};

const saveToDatabase = async (data) => {
    const {
        student_id,
        head_name,
        ledger_name,
        fees_amount,
        fine_amount,
        alloted_date,
        due_date,
        due_extend1,
        fine_extend1,
        due_extend2,
        fine_extend2,
        due_extend3,
        fine_extend3,
        due_extend4,
        fine_extend4,
    } = data;

    const head_id = await getHeadId(head_name);
    const ledger_id = await getLedgerId(ledger_name);

    if (!head_id || !ledger_id) {
        throw new Error("Invalid head_name or ledger_name");
    }

    const checkQuery = `
    SELECT COUNT(*) AS count 
    FROM fees_allotment 
    WHERE student_id = ? AND head_id = ? AND ledger_id = ?`;
    const checkResult = await queryAsync(checkQuery, [student_id, head_id, ledger_id]);

    // if (checkResult[0].count > 0) {
    //     // Already exists, skip or update logic could go here
    //     return;
    // }

    const total_amount = parseFloat(fees_amount) + parseFloat(fine_amount || 0);

    const insertQuery = `
    INSERT INTO fees_allotment 
    (Allotment_Id, student_id, ledger_id, head_id, fees_amount, total_amount, alloted_date, due_date, fine_amount, isPaid,
     due_extend1, fine_extend1, due_extend2, fine_extend2, due_extend3, fine_extend3, due_extend4, fine_extend4, feeStatus) 
    VALUES 
    (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;

    await queryAsync(insertQuery, [
        student_id, ledger_id, head_id, fees_amount, total_amount,
        alloted_date, due_date, fine_amount || 0,
        due_extend1 || null, fine_extend1 || 0,
        due_extend2 || null, fine_extend2 || 0,
        due_extend3 || null, fine_extend3 || 0,
        due_extend4 || null, fine_extend4 || 0
    ]);
};

const parseExcelAndSave = async (buffer) => {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = xlsx.utils.sheet_to_json(sheet);
    const rows = rawRows.map(cleanRowKeys);

    let saved = 0, skipped = 0;

    for (const row of rows) {
        if (!row.student_id || !row.head_name || !row.ledger_name || !row.fees_amount) {
            skipped++;
            continue;
        }

        const record = {
            student_id: row.student_id,
            head_name: row.head_name,
            ledger_name: row.ledger_name,
            fees_amount: row.fees_amount,
            alloted_date: formatExcelDate(row.alloted_date),
            due_date: formatExcelDate(row.due_date),
            fine_amount: row.fine_amount || 0,
            due_extend1: formatExcelDate(row.due_extend1),
            fine_extend1: row.fine_extend1 || 0,
            due_extend2: formatExcelDate(row.due_extend2),
            fine_extend2: row.fine_extend2 || 0,
            due_extend3: formatExcelDate(row.due_extend3),
            fine_extend3: row.fine_extend3 || 0,
            due_extend4: formatExcelDate(row.due_extend4),
            fine_extend4: row.fine_extend4 || 0
        };

        try {
            await saveToDatabase(record);
            saved++;
        } catch (err) {
            console.error("Skipping row due to error:", err.message);
            skipped++;
        }
    }

    return { saved, skipped };
};

module.exports = { parseExcelAndSave };
