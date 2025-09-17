const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  edad: { type: Number, required: true, min: 0 },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true } // se guardará el hash
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);
