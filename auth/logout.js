const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  try {
    // Eliminar el token de autenticación del usuario
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;