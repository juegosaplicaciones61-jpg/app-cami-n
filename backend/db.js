const mysql = require("mysql2");
console.log(process.env.MYSQLHOST);
console.log(process.env.MYSQLUSER);
console.log(process.env.MYSQLDATABASE);
console.log(process.env.MYSQLPORT);

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

connection.connect((err) => {

  if (err) {
    console.log("Error conexión:", err);
  } else {
    console.log("MySQL conectado");
  }

});

module.exports = connection;