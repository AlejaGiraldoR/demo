// ======================================================
// CONTROLADOR DE USUARIOS
// ======================================================

// importamos modelo User para interactuar con la base de datos
const User = require("../models/User");

// ======================================================
// FUNCION PARA REGISTRAR USUARIO (SIGNUP)
// ======================================================
const signup = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password, confirmPassword } = req.body;

    // validamos que ningun campo este vacío
    if (!firstName || !lastName || !age || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // edad mínima 13 años
    if (age < 13) {
      return res.status(400).json({ message: "Age must be at least 13" });
    }

    // password y confirmPassword deben coincidir
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // verificamos si email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // creamos nuevo usuario
    const newUser = new User({ firstName, lastName, age, email, password });
    await newUser.save();

    // respuesta exitosa
    res.status(201).json({ id: newUser._id, message: "User created successfully" });
  } catch (err) {
    console.error("signup error:", err);

    // manejamos errores de validación de mongoose
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }

    // error de clave duplicada
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // otros errores
    return res.status(500).json({ message: err.message, stack: err.stack });
  }
};

// ======================================================
// FUNCION PARA OBTENER TODOS LOS USUARIOS
// ======================================================
const getUsers = async (req, res) => {
  try {
    // buscamos todos los usuarios, excluyendo password y __v
    const users = await User.find().select("-password -__v");
    res.status(200).json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// exportamos funciones para usarlas en rutas
module.exports = { signup, getUsers };
