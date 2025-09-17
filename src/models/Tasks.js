const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  detalle: { type: String },
  fecha: { type: String, required: true }, // "YYYY-MM-DD"
  hora: { type: String, required: true },  // "HH:MM"
  estado: { type: String, enum: ['por hacer','haciendo','hecho'], default: 'por hacer' },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' } // opcional relación
}, { timestamps: true });

module.exports = mongoose.model('Tarea', TareaSchema);
