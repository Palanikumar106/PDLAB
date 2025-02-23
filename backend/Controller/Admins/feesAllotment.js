
const mysqlConnection=require('../../config/mysqlConfig');
const getHeadId = require('../../miscellaneous/getHeadId');
const getLedgerId = require('../../miscellaneous/getLedgerId');
const feesAllotController=async(req,res)=>{
    try {
        const { student_id,head_name, ledger_name,fees_amount,alloted_date,due_date,fine_amount} = req.body;

        if (!student_id || !head_name||!ledger_name||!fees_amount||!alloted_date||!due_date||!fine_amount) {
            return res.status(400).json({ error: "All the fields are required" });
        }
        const head_id = await getHeadId(head_name)
        const ledger_id = await getLedgerId(ledger_name)

        const query = 'INSERT INTO fees_allotment (Allotment_Id,student_id,ledger_id, head_id,fees_amount,alloted_date,due_date,fine_amount) VALUES (UUID(),?,?,?, ?, ?,?,?)';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [student_id,ledger_id,head_id,fees_amount,alloted_date,due_date,fine_amount], (err, result) => {
                if (err) {
                    console.log(err)
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
}
module.exports=feesAllotController;