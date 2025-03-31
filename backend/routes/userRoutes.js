const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ✅ Importado correctamente
const User = require('../models/User');

// Clave secreta para JWT
const SECRET_KEY = 'tu_clave_secreta';

// ✅ Ruta de Registro de Usuario
router.post('/register', async (req, res) => {
    try {
        const { nombre, password, tipo_usuario, notificaciones } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ nombre });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const nuevoUsuario = new User({
            nombre,
            password: hashedPassword,
            tipo_usuario,
            notificaciones,
        });

        await nuevoUsuario.save();
        res.json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ✅ Ruta de Inicio de Sesión
router.post('/login', async (req, res) => {
    try {
        const { nombre, password } = req.body;
        console.log(`🔍 Buscando usuario: ${nombre}`);

        // Buscar usuario en la base de datos
        const usuario = await User.findOne({ nombre });
        if (!usuario) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, SECRET_KEY, { expiresIn: '1h' });

        console.log('✅ Login exitoso, token generado:', token);
        res.json({ token, nombre: usuario.nombre });
    } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
