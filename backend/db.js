const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "turntable.proxy.rlwy.net",
  user: "root",
  password: "GpUApIkAUYZAGoJjSlFbxEpmYbhgPOSg",
  database: "railway",
  port: 19016
});

connection.connect((err) => {

  if (err) {
    console.log("Error conexión:", err);
  } else {
    console.log("MySQL conectado");
  }

});

module.exports = connection;