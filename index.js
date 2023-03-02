const express = require('express');
const app = express();
const db = require('./config/database');

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Rutas de la API
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

// Middleware de express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Conexión a la base de datos
db.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((error) => console.log(`Error al conectar a la base de datos: ${error}`));

// Inicio del servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));