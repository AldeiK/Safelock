const express = require('express');
const router = express.Router();
const axios = require('axios');

// Dirección IP de la ESP32 desde el archivo .env
const ESP32_IP = process.env.ESP32_IP || 'http://10.1.3.91'; // IP predeterminada

// Endpoint para abrir la puerta
router.post('/abrir', async (req, res) => {
  try {
    const response = await axios.get(`${ESP32_IP}/abrir`);
    res.json({ message: 'Puerta abierta', esp32Response: response.data });
  } catch (error) {
    console.error('Error al abrir la puerta:', error);
    res.status(500).json({ error: 'Error al abrir la puerta' });
  }
});

// Endpoint para cerrar la puerta
router.post('/cerrar', async (req, res) => {
  try {
    const response = await axios.get(`${ESP32_IP}/cerrar`);
    res.json({ message: 'Puerta cerrada', esp32Response: response.data });
  } catch (error) {
    console.error('Error al cerrar la puerta:', error);
    res.status(500).json({ error: 'Error al cerrar la puerta' });
  }
});

// Endpoint para obtener el estado de la puerta
router.get('/estado', async (req, res) => {
  try {
    const response = await axios.get(`${ESP32_IP}/estado`);
    res.json({ estado: response.data });
  } catch (error) {
    console.error('Error al obtener el estado de la puerta:', error);
    res.status(500).json({ error: 'Error al obtener el estado de la puerta' });
  }
});

module.exports = router;