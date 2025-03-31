const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://Jose_Rodolfo:200705@rodolfo.b8l5q.mongodb.net/db_Safelock', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// Rutas
const userRoutes = require('./routes/userRoutes');
const dispositivoRoutes = require('./routes/dispositivoRoutes'); // Importa las rutas de dispositivos
const controlPuertaRoutes = require('./routes/controlPuertaRoutes'); // Importa las rutas de control de la puerta
const registroRoutes = require('./routes/registroRoutes'); // Importa las rutas de registros

app.use('/api/registros', registroRoutes); // Registra las rutas de registros
app.use('/api/users', userRoutes);
app.use('/api/dispositivos', dispositivoRoutes); // Registra las rutas de dispositivos
app.use('/api/puerta', controlPuertaRoutes); // Registra las rutas de control de la puerta

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});