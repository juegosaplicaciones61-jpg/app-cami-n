const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "GpUApIkAUYZAGoJjSlFbxEpmYbhgPOSg",
  database: "railway",
  port: 3306
});

connection.connect((err) => {

  if (err) {
    console.log("Error conexión:", err);
  } else {
    console.log("MySQL conectado");
  }

});

module.exports = connection;