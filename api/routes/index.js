// ======================================================
// RUTAS PRINCIPALES DE LA API
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// RUTAS DE USUARIOS
// ======================================================
// todas las rutas que empiecen con /users usarán userRoutes
const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

// ======================================================
// RUTAS DE AUTENTICACION
// ======================================================
// todas las rutas que empiecen con /auth usarán authRoutes
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

// ======================================================
// RUTAS DE TEST
// ======================================================
// todas las rutas que empiecen con /test usarán testRoutes
const testRoutes = require("./testRoutes");
router.use("/test", testRoutes);

// ======================================================
// RUTAS DE TAREAS
// ======================================================
// todas las rutas que empiecen con /tasks usarán taskRoutes
const taskRoutes = require("./taskRoutes");
router.use("/tasks", taskRoutes); 

// exportamos el router principal para usar en app.js
module.exports = router;
