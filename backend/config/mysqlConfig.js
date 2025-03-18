const mysql = require("mysql2");
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user:process.env.USER_NAME,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
});
mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Database Connect");
});
module.exports = mysqlConnection;
