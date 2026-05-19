const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
app.post("/income", (req, res) => {

  const { client, route, value, date } = req.body;

  const sql = `
    INSERT INTO income (client, route, value, date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [client, route, value, date],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).send("Error guardando ingreso");
      } else {
        res.send("Ingreso guardado correctamente");
      }

    }
  );

});

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});