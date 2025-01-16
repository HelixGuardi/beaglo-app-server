const router = require("express").Router();

const User = require("../models/User.model.js");
const { verifyToken } = require("../middlewares/auth.middlewares.js");

// GET /api/users/own -> obtiene el perfil del usuario logeado (necesario autenticación)
router.get("/own", verifyToken, async (req, res) => {
  try {
    const response = await User.findById(req.payload._id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


// PUT /api/users/own -> edita el perfil del usuario logeado (necesario autenticación)
router.put("/own", verifyToken, async (req, res) => {
    
    try {
        
        await User.findByIdAndUpdate( req.payload._id, {
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username
        })
        res.sendStatus(202)

    } catch (error) {
        next(error)
    }
})


// GET /api/users/:userId -> obtiene el perfil de un usuario especifico
router.get("/:userId", async (req, res, next) => {
  // console.log(req.params)

  try {
    const response = await User.findById(req.params.userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
