const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js")
const { verifyToken } = require("../middlewares/auth.middlewares.js")

// GET /api/users/:userId -> obtiene el perfil de un usuario especifico
router.get("/:userId", async (req, res) => {

    // console.log(req.params)

    try {

        const response = await User.findById( req.params.userId )
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
    
})

// GET /api/users/own -> obtiene el perfil del usuario logeado (necesario autenticación)
    // router.get("/own", verifyToken, (req, res) => {
    //     console.log(req.payload)
    //     res.send("ruta funcional")
    // })

// PUT /api/users/own -> edita el perfil del usuario logeado (necesario autenticación)


module.exports = router;