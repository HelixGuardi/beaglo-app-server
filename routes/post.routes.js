const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model.js");
const { verifyToken } = require("../middlewares/auth.middlewares.js");

// POST /api/posts/create-post -> crea un post desde el usuario logeado (necesario autenticación)
router.post("/create-post", verifyToken, async (req, res, next) => {
    
    try {
        
        await Post.create({
            image: req.body.image,
            description: req.body.description,
            location: req.body.location,
            userCreator: req.payload._id
        })
        res.sendStatus(201)

    } catch (error) {
        next(error)
    }
})

// GET /api/posts -> obtiene todos los posts
router.get("/", async (req, res, next) => {
  try {
    const response = await Post.find();
    res.status(200).json(response);
} catch (error) {
    next(error);
}
});

// GET /api/posts/:postId -> obtiene un post especifico
router.get("/:postId", async (req, res, next) => {
    try {
        const response = await Post.findById(req.params.postId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

// PUT /api/posts/:postId -> edita el post del usuario logeado (necesario autenticación)
router.patch("/:postId", verifyToken, async (req, res, next) => {
    
    try {

        await Post.findByIdAndUpdate( req.params.postId, {
            description: req.body.description
        })
        res.sendStatus(202)

    } catch (error) {
        next(error)
    }
})

// DELETE /api/posts/:postId -> elimina un post desde el usuario logeado (necesario autenticación)
router.delete("/:postId", verifyToken, async (req, res, next) => {

    try {
        
        await Post.findByIdAndDelete( req.params.postId )
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
})

module.exports = router;
