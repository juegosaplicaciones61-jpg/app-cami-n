const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   OBTENER INGRESOS
========================= */

app.get("/income", (req, res) => {

  console.log("Consultando ingresos...");
  const sql = "SELECT * FROM income ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error obteniendo ingresos");
    } else {
      res.json(result);
    }

  });

});

/* =========================
   CREAR INGRESO
========================= */

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

/* =========================
   ELIMINAR INGRESO
========================= */

app.delete("/income/:id", (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM income WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error eliminando ingreso");
    } else {
      res.send("Ingreso eliminado");
    }

  });

});

/* =========================
   OBTENER GASTOS
========================= */

app.get("/expenses", (req, res) => {

  const sql = "SELECT * FROM expenses ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error obteniendo gastos");
    } else {
      res.json(result);
    }

  });

});

/* =========================
   CREAR GASTO
========================= */

app.post("/expenses", (req, res) => {

  const { type, description, value, date } = req.body;

  const sql = `
    INSERT INTO expenses (type, description, value, date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [type, description, value, date],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).send("Error guardando gasto");
      } else {
        res.send("Gasto guardado correctamente");
      }

    }
  );

});

/* =========================
   ELIMINAR GASTO
========================= */

app.delete("/expenses/:id", (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM expenses WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Error eliminando gasto");
    } else {
      res.send("Gasto eliminado");
    }

  });

});

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});