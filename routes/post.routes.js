const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model.js")

// GET /api/posts -> obtiene todos los posts //! Pendiente de testear en postman
router.get("/", async (req, res) => {

    try {
        
        const response = await Post.find()
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
})

// GET /api/posts/:postId -> obtiene un post especifico //! Pendiente de testear en postman
router.get("/:postId", async (req, res) => {

    try {
        
        const response = await Post.findById( req.params.postId )
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
})

// POST /api/post -> crea un post desde el usuario logeado (necesario autenticación)

// PUT /api/post/:postId -> edita el post del usuario logeado (necesario autenticación)

// DELETE /api/post/:postId -> elimina un post desde el usuario logeado (necesario autenticación)


module.exports = router;