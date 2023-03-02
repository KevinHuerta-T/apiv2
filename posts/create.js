const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const { verifyToken } = require('../middleware/jwt');
const Post = require('../models/post');

router.post('/', [
  body('titulo').notEmpty().withMessage('Title is required'),
  body('descripcion').notEmpty().withMessage('Description is required'),
], verifyToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const post = await Post.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      UserId: req.user.id
    });

    return res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;