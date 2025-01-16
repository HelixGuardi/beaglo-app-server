const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// POST /api/comments/posts/:postId -> crea un comentario en un post especifico
router.post("/posts/:postId", verifyToken, async (req, res, next) => {

  try {
    await Comment.create({
      content: req.body.content,
      user: req.payload._id,
      post: req.params.postId
    });
    res.sendStatus(201);

  } catch (error) {
    next(error);
  }
});

// GET /api/comments/posts/:postId -> obtiene comentarios de un post especifico
router.get("/posts/:postId", async (req, res, next) => {
  try {

    const response = await Comment.find({post: req.params.postId})
    res.status(200).json(response)

  } catch (error) {
    next(error);
  }
});

// DELETE /api/comments/:commentId -> Elimina un comentario especifico 
router.delete("/:commentId", async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
}); 

module.exports = router;
