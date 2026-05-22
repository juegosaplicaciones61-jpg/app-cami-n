const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

/* =========================
   CONFIGURACION
========================= */

app.use(cors());
app.use(express.json());

console.log("Servidor iniciando...");

/* =========================
   MYSQL RAILWAY
========================= */

const db = mysql
  .createPool(process.env.DATABASE_URL)
  .promise();

console.log("Pool MySQL iniciado");

/* =========================
   RUTA PRINCIPAL
========================= */

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

/* =========================
   OBTENER INGRESOS
========================= */

app.get("/income", async (req, res) => {

  try {

    const [result] = await db.query(
      "SELECT * FROM income ORDER BY id DESC"
    );

    res.json(result);

  } catch (err) {

    console.log("ERROR OBTENIENDO INGRESOS:");
    console.log(err);

    res.status(500).json(err);

  }

});

/* =========================
   CREAR INGRESO
========================= */

app.post("/income", async (req, res) => {

  try {

    const { client, route, value, date } = req.body;

    await db.query(
      `
      INSERT INTO income (client, route, value, date)
      VALUES (?, ?, ?, ?)
      `,
      [client, route, value, date]
    );

    res.send("Ingreso guardado correctamente");

  } catch (err) {

    console.log("ERROR CREANDO INGRESO:");
    console.log(err);

    res.status(500).json(err);

  }

});

/* =========================
   ELIMINAR INGRESO
========================= */

app.delete("/income/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM income WHERE id = ?",
      [id]
    );

    res.send("Ingreso eliminado");

  } catch (err) {

    console.log("ERROR ELIMINANDO INGRESO:");
    console.log(err);

    res.status(500).json(err);

  }

});

/* =========================
   OBTENER GASTOS
========================= */

app.get("/expenses", async (req, res) => {

  try {

    const [result] = await db.query(
      "SELECT * FROM expenses ORDER BY id DESC"
    );

    res.json(result);

  } catch (err) {

    console.log("ERROR OBTENIENDO GASTOS:");
    console.log(err);

    res.status(500).json(err);

  }

});

/* =========================
   CREAR GASTO
========================= */

app.post("/expenses", async (req, res) => {

  try {

    const { type, description, value, date } = req.body;

    await db.query(
      `
      INSERT INTO expenses (type, description, value, date)
      VALUES (?, ?, ?, ?)
      `,
      [type, description, value, date]
    );

    res.send("Gasto guardado correctamente");

  } catch (err) {

    console.log("ERROR CREANDO GASTO:");
    console.log(err);

    res.status(500).json(err);

  }

});

/* =========================
   ELIMINAR GASTO
========================= */

app.delete("/expenses/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM expenses WHERE id = ?",
      [id]
    );

    res.send("Gasto eliminado");

  } catch (err) {

    console.log("ERROR ELIMINANDO GASTO:");
    console.log(err);

    res.status(500).json(err);

  }

});

/* =========================
   PUERTO
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});