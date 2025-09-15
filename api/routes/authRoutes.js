// ======================================================
// RUTAS DE AUTENTICACION (LOGIN / LOGOUT / RECUPERACION)
// ======================================================

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// ======================================================
// LOGIN
// ======================================================
// POST /auth/login
// recibe email y password, devuelve token JWT si es válido
router.post("/login", AuthController.login);

// ======================================================
// LOGOUT
// ======================================================
// POST /auth/logout
// invalida el token actual y agrega a la blacklist
router.post("/logout", (req, res) => AuthController.logout(req, res));

// ======================================================
// OLVIDO DE CONTRASEÑA
// ======================================================
// POST /auth/forgot-password
// recibe email, genera token de recuperación y envía correo
router.post("/forgot-password", AuthController.forgotPassword);

// ======================================================
// RESET CONTRASEÑA
// ======================================================
// POST /auth/reset-password/:token
// recibe token de recuperación en params y nueva contraseña en body
router.post("/reset-password/:token", AuthController.resetPassword);

// POST /auth/reset-password
// alternativa para reset sin token en params (dependiendo del flujo)
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
