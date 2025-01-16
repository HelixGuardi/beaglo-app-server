const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model.js");
const { verifyToken } = require("../middlewares/auth.middlewares.js");

// POST /api/posts -> crea un post desde el usuario logeado (necesario autenticación) //! Pendiente
router.post("/own", verifyToken, async (req, res) => {
    console.log(req.payload)
    res.send("Todo fino amigo! Hora de crear un post nene xd")
})

// GET /api/posts -> obtiene todos los posts //! Pendiente de testear en postman
router.get("/", async (req, res) => {
  try {
    const response = await Post.find();
    res.status(200).json(response);
} catch (error) {
    next(error);
}
});

// GET /api/posts/:postId -> obtiene un post especifico //! Pendiente de testear en postman
router.get("/:postId", async (req, res) => {
    try {
        const response = await Post.findById(req.params.postId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

// PUT /api/posts/:postId -> edita el post del usuario logeado (necesario autenticación) //! Pendiente

// DELETE /api/posts/:postId -> elimina un post desde el usuario logeado (necesario autenticación) //! Pendiente

module.exports = router;
