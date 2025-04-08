const mysql = require("mysql2");
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "Shan",
  password: "Nahs@12$$",
  database: "fees_management",
});
mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Database Connect");
});
module.exports = mysqlConnection;
