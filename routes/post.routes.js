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
    const response = await Post
    .find()
    .populate("userCreator", {username: 1, _id: 1, profileImg: 1})
    res.status(200).json(response);
} catch (error) {
    next(error);
}
});

// GET /api/posts/own -> obtiene todos los posts del usuario loggeado
router.get("/own", verifyToken, async (req, res, next) => {
    try {

        const response = await Post
        .find({ userCreator: req.payload._id })
        .populate("userCreator", {username: 1, _id: 1, profileImg: 1})
        res.status(200).json(response)

    } catch(error) {
        next(error)
    }
})

// GET /api/posts/user/:userId -> obtiene todos los posts de un usuario específico
router.get("/user/:userId", verifyToken, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ userCreator: userId });

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

// PATCH /api/posts/:postId/like -> dar like
router.patch("/:postId/like", verifyToken, async (req, res, next) => {
    
    try {

        await Post.findByIdAndUpdate( req.params.postId, {
            $addToSet: {
                likes: req.payload._id
            }
        })
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
})

// PATCH /api/posts/:postId/undo-like -> quitar like
router.patch("/:postId/undo-like", verifyToken, async (req, res, next) => {

    try {

        await Post.findByIdAndUpdate( req.params.postId, {
            $pull: {
                likes: req.payload._id
            }
        })
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
})

// PATCH /api/posts/:postId/dislike -> dar dislike
router.patch("/:postId/dislike", verifyToken, async (req, res, next) => {
    
    try {

        await Post.findByIdAndUpdate( req.params.postId, {
            $addToSet: {
                dislikes: req.payload._id
            }
        })
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
})

// PATCH /api/posts/:postId/undo-dislike -> quitar dislike
router.patch("/:postId/undo-dislike", verifyToken, async (req, res, next) => {

    try {

        await Post.findByIdAndUpdate( req.params.postId, {
            $pull: {
                dislikes: req.payload._id
            }
        })
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
})

// GET /api/posts/:postId -> obtiene un post especifico
router.get("/:postId", async (req, res, next) => {
    try {
        const response = await Post
        .findById(req.params.postId)
        .populate("userCreator")

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

// PATCH /api/posts/:postId -> edita el post del usuario logeado (necesario autenticación)
router.patch("/:postId", verifyToken, async (req, res, next) => {
    
    try {
        const post = await Post.findById(req.params.postId)
        if(post.userCreator._id.toString() !== req.payload._id.toString()) {
            return res.status(403).json({message: 'Unauthorized action'})
        }

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
        const post = await Post.findById(req.params.postId)
        if(post.userCreator._id.toString() !== req.payload._id.toString()) {
            return res.status(403).json({message: 'Unauthorized action'})
        }
        
        await Post.findByIdAndDelete( req.params.postId )
        res.sendStatus(200)

    } catch (error) {
        next(error)
    }
})

module.exports = router;