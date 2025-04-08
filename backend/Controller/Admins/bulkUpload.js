const { parseExcelAndSave } = require("./excelController");

const handleBulkUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        console.log("file");
        const result = await parseExcelAndSave(req.file.buffer);

        return res.json({
            message: `Bulk upload completed. ${result.saved} saved, ${result.skipped} skipped.`,
        });
    } catch (err) {
        console.error("Bulk Upload Error:", err);
        return res.status(500).json({ error: "Internal server error during bulk upload." });
    }
};

module.exports = { handleBulkUpload };
