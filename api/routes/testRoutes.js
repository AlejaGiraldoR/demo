// ======================================================
// RUTAS DE TEST
// ======================================================

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// ======================================================
// DASHBOARD / TEST
// ======================================================
// GET /test/dashboard
// devuelve un mensaje con el correo del usuario autenticado
// requiere autenticación
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Hola, ${req.user.email}` });
});

// exportamos el router para usarlo en index.js de rutas
module.exports = router;
