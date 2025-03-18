
const mysqlConnection = require('../../config/mysqlConfig')
const headController = async(req, res) => {
    try {
        const { head_name } = req.body;
        if (!head_name) {
            return res.status(400).json({ error: "head_name are required" });
        }
        const query = 'INSERT INTO fees_head (head_id, head_name) VALUES (UUID(), ?)';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [head_name], (err, result) => {
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
}

const getHeadFields=async(req,res)=>{
    try {
        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT * FROM fees_head', (err, rows) => {
                if (err) {
                    reject(new Error("Query execution failed"));
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length === 0) {
            return res.status(404).json({ error: "No Fees Head found" });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }   
}


const deleteHead = async (req, res) => {
    try {
        const { head_name } = req.body;
        if (!head_name) {
            return res.status(400).json({ error: "head_name are required" });
        }
        const query = 'delete from fees_head where Head_name=?';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [head_name], (err, result) => {
                if (err) {
                    reject(new Error("Query execution failed"+err));
                } else {
                    resolve("Records Deleted");
                }
            });
        });

        res.json({ message: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


const updateHead = async (req, res) => {
    try {
        const { old_name,new_name } = req.body;
        if (!old_name||!new_name) {
            return res.status(400).json({ error: "Old_name And New_Name are required" });
        }
        const query = 'update fees_head set Head_name=? where Head_name=?';

        const rows = await new Promise((resolve, reject) => {
            mysqlConnection.query(query, [new_name,old_name], (err, result) => {
                if (err) {
                    reject(new Error("Query execution failed" + err));
                } else {
                    resolve("Records Updated");
                }
            });
        });

        res.json({ message: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = {headController,getHeadFields,deleteHead,updateHead};