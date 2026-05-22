const mysql = require("mysql2");

const db = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

console.log("MySQL conectado");

module.exports = db;