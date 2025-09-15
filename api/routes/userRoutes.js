// ======================================================
// RUTAS DE USUARIOS
// ======================================================

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// ======================================================
// REGISTRO DE USUARIO
// ======================================================
// POST /users/signup
// recibe datos del usuario y crea un nuevo registro
router.post("/signup", UserController.signup);

// ======================================================
// OBTENER TODOS LOS USUARIOS
// ======================================================
// GET /users
// devuelve todos los usuarios, excluyendo password y __v
router.get("/", UserController.getUsers);

// exportamos el router para usarlo en index.js de rutas
module.exports = router;
