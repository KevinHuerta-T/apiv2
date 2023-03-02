const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ where: { email } });

    // Si el usuario no existe, enviar una respuesta de error
    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Verificar la contraseña del usuario
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide, enviar una respuesta de error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Generar un token JWT con la información del usuario
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      rol: user.rol
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Enviar la respuesta exitosa con el token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;