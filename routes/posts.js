const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const { verifyToken } = require('../middleware/jwt');
const Post = require('../models/post');

router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ['user'] });
    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', [
  body('titulo').notEmpty().withMessage('Title is required'),
  body('descripcion').notEmpty().withMessage('Description is required')
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

router.put('/:id', [
  body('titulo').notEmpty().withMessage('Title is required'),
  body('descripcion').notEmpty().withMessage('Description is required')
], verifyToken, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.titulo = req.body.titulo;
    post.descripcion = req.body.descripcion;
    await post.save();

    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;