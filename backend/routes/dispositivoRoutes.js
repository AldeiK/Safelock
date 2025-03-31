const express = require('express');
const router = express.Router();
const Dispositivo = require('../models/Dispositivos');

// Obtener todos los dispositivos
router.get('/', async (req, res) => {
  try {
    const dispositivos = await Dispositivo.find(); // Obtiene todos los dispositivos
    res.json(dispositivos);
  } catch (error) {
    console.error('Error al obtener los dispositivos:', error);
    res.status(500).json({ error: 'Error al obtener los dispositivos' });
  }
});

// Agregar un nuevo dispositivo
router.post('/', async (req, res) => {
  try {
    const nuevoDispositivo = new Dispositivo(req.body);
    const dispositivoGuardado = await nuevoDispositivo.save();
    res.status(201).json(dispositivoGuardado);
  } catch (error) {
    console.error('Error al agregar el dispositivo:', error);
    res.status(500).json({ error: 'Error al agregar el dispositivo' });
  }
});

module.exports = router;