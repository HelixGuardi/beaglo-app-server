const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const { verifyToken } = require("../middlewares/auth.middlewares")

//EJEMPLO DE RUTA PRIVADA -----------------------------------------
router.get("/private-route-example", verifyToken, (req, res) => {

  // console.log(req.headers)

  //! EL BACKEND NECESITA SABER QUIEN ES EL USUARIO
  console.log(req.payload)

  res.send("envio de información privada o acción privada")

})

module.exports = router;
