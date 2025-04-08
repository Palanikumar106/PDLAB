const xlsx = require("xlsx");

const formatExcelDate = (excelDate) => {
    if (!excelDate) return null;
    // Convert Excel serial date to JS Date object
    const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
    // Format as YYYY-MM-DD
    return jsDate.toISOString().split("T")[0];
};


// Replace this with real DB insertion logic
const saveToDatabase = async (data) => {
    console.log("Saving to DB:", data);
    // Example:
    // await db.query("INSERT INTO fees (student_id, ...) VALUES (?, ?, ...)", [...])
};
const cleanRowKeys = (row) => {
    const cleaned = {};
    for (let key in row) {
        cleaned[key.trim()] = row[key]; // Remove leading/trailing whitespace
    }
    return cleaned;
};


const parseExcelAndSave = async (buffer) => {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = xlsx.utils.sheet_to_json(sheet);
    const rows = rawRows.map(cleanRowKeys); // Clean headers


    let saved = 0;
    let skipped = 0;

    for (const row of rows) {
        if (!row.student_id || !row.head_name || !row.ledger_name || !row.fees_amount) {
            skipped++;
            continue;
        }
        console.log("",row)
        const record = {
            student_id: row.student_id,
            Head_name: row.head_name,
            ledger_name: row.ledger_name,
            fees_amount: row.fees_amount,
            alloted_date: formatExcelDate(row.alloted_date),
            due_date: formatExcelDate(row.due_date),
            fine_amount: row.fine_amount || 0,
        };

        await saveToDatabase(record);
        saved++;
    }

    return { saved, skipped };
};

module.exports = { parseExcelAndSave };
