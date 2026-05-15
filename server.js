require("dotenv").config();
const cors = require("cors");

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();
const views = require("./config/views");
app.use(cors());
views(app);
routes(app);

// dbInitialSetup(); // Crea tablas e inserta datos de prueba.

const getStart = async () => {
  // Crea tablas e inserta datos de prueba.
  if (process.env.APP_RESET_DB === "true") {
    console.log("🔄 Reiniciando base de datos...");
    await dbInitialSetup();
    console.log("✅ Base de datos inicializada");
  }
};

console.log("🚀 Iniciando servidor...");
getStart();

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
