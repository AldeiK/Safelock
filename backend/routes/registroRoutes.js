const express = require('express');
const router = express.Router();
const Registro = require('../models/Registro');

// Endpoint para registrar accesos
router.post('/', async (req, res) => {
  const { cardID, usuario } = req.body;

  if (!cardID || !usuario) {
    return res.status(400).json({ error: 'Faltan datos: cardID o usuario' });
  }

  try {
    const nuevoRegistro = new Registro({ cardID, usuario });
    await nuevoRegistro.save();
    res.status(201).json({ message: 'Acceso registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar acceso:', error);
    res.status(500).json({ error: 'Error al registrar acceso' });
  }
});

// Endpoint para obtener el historial de un usuario
router.get('/:usuario', async (req, res) => {
  const { usuario } = req.params;

  try {
    const historial = await Registro.find({ usuario }).sort({ fechaHora: -1 });
    res.status(200).json(historial);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

module.exports = router;