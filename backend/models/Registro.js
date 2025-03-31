const mongoose = require('mongoose');

// Esquema para la colección "Registros"
const registroSchema = new mongoose.Schema({
  cardID: { type: String, required: true }, // ID del dispositivo
  usuario: { type: String, required: true }, // Usuario que realizó la acción
  fechaHora: { type: Date, default: Date.now }, // Fecha y hora del registro
});

const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;