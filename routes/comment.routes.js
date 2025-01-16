const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment.model");

// POST /api/comments/:postId -> crea un comentario en un post especifico //! Pendiente de testear en postman
router.post("/:postId", async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      user: req.body.user, //? Preguntar a Jorge
      post: req.body.post, //? Preguntar a Jorge
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// GET /api/comments/:postId -> obtiene comentarios de un post especifico //! Pendiente de testear en postman
router.get("/:postId", async (req, res) => {
  try {
    //? Preguntar a Jorge
  } catch (error) {
    next(error);
  }
});

// DELETE /api/comments/:commentId -> Elimina un comentario especifico //! Pendiente de testear en postman
router.delete("/:commentId", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
