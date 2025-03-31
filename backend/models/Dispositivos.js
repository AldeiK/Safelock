const mongoose = require('mongoose');

// Esquema para la colección "Dispositivos"
const dispositivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, required: true }, // Ejemplo: "abierto" o "cerrado"
  descripcion: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
});

// Modelo de Mongoose
const Dispositivo = mongoose.model('Dispositivo', dispositivoSchema);

module.exports = Dispositivo;