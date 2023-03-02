const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    // Verificar que no exista un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Ya existe un usuario con este correo electrónico' });
    }

    // Encriptar la contraseña del usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario en la base de datos
    const user = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol
    });

    // Enviar la respuesta exitosa con la información del usuario creado
    res.status(201).json({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;