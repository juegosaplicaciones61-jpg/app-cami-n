const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "TU_HOST",
  user: "root",
  password: "TU_PASSWORD",
  database: "railway",
  port: TU_PORT
});

connection.connect((err) => {

  if (err) {
    console.log("Error conexión:", err);
  } else {
    console.log("MySQL conectado");
  }

});

module.exports = connection;