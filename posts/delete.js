const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/jwt');
const Post = require('../models/post');

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;