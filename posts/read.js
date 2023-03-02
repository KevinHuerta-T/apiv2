const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/jwt');
const Post = require('../models/post');
const User = require('../models/user');

router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'titulo', 'descripcion', 'createdAt'],
      include: [{ model: User, attributes: ['nombre', 'apellido', 'rol'] }],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;