const mysqlConnection=require('../config/mysqlConfig')
const getHeadId=async(head_name)=>{
    const head_id = await new Promise((resolve, reject) => {
        const getId = `SELECT head_id FROM fees_head WHERE head_name = ?`;
        mysqlConnection.query(getId, [head_name], (err, result) => {
            if (err) {
                reject(new Error("Query execution failed"));
            } else {
                if (result.length === 0) {
                    reject(new Error("Invalid head_name or head not found"));
                } else {
                    resolve(result[0].head_id);
                }
            }
        });
    });
    return head_id;
}
module.exports=getHeadId;