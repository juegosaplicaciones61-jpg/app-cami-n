const mysql = require("mysql2");

console.log("=========== DB NUEVO ===========");
console.log("MYSQLHOST:", process.env.MYSQLHOST);

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
}).promise();

module.exports = db;