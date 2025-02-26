const mysql = require("mysql2");
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  port:3307,
  user: "shanmugam",
  password: "1234",
  database: "fees_management",
});
mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Database Connect");
});
module.exports = mysqlConnection;
