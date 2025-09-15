// ======================================================
// SERVIDOR PRINCIPAL (app.js)
// ======================================================

// importamos express para crear el servidor
const express = require("express");

// cargamos variables de entorno desde .env
require("dotenv").config();

// importamos cors para permitir solicitudes desde otros dominios
const cors = require("cors");

// importamos la funcion para conectar a la base de datos
const { connectDB } = require("./config/database");

// importamos el router principal que agrupa todas las rutas
const routes = require("./routes/index"); // index.js dentro de /routes

// creamos la aplicacion express
const app = express();

// MIDDLEWARES


// para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// para parsear datos codificados en URL (formularios)
app.use(express.urlencoded({ extended: true }));

// habilitamos CORS
app.use(cors());

// RUTA BASICA DE TEST

// GET /
// devuelve un mensaje simple para verificar que el servidor funciona
app.get("/", (req, res) => res.send("Server is running"));

// RUTAS DE LA API

// todas las rutas empiezan con /api/v1
app.use("/api/v1", routes);

// CONEXION A LA BASE DE DATOS

connectDB(); // ejecuta la funcion para conectar a MongoDB


// PUERTO DE ESCUCHA

// solo se ejecuta si este archivo se corre directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(` server running on http://localhost:${PORT}`);
  });
}

// exportamos la app para tests automáticos u otros usos
module.exports = app;
