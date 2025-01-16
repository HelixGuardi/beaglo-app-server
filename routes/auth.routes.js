const router = require("express").Router();

const User = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.middlewares");

// POST "/api/auth/signup" => registrar el usuario
router.post("/signup", async(req, res, next) => {

    // recibir la data del usuario
    console.log(req.body)
    const { name, surname, username, dateOfBirth, email, password } = req.body

    //* validaciones
        // verificar que la data existe
    if (!name || !surname || !username || !dateOfBirth || !email || !password) {
        res.status(400).json({errorMessage: "Nombre, Apellido, Email, Contraseña y Fecha de nascimiento son campos obligatorios. "})
        return // detener la ejecución de la ruta
    }

        // verificar que el nombre minimo 2 caracteres
    if (name.length < 2) {
        res.status(400).json({errorMessage: "El nombre tiene que tener 2 o más caracteres. "})
        return // detener la ejecución de la ruta
    }

        // verificar que la contraseña cumple con nivel de seguridad
    const regexPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (regexPasswordPattern.test(password) === false) {
        res.status(400).json({errorMessage: "La contraseña no es valida. Debe contener minimo 8 caracteres, 1 mayuscula y 1 minuscula, y un numero"})
        return // detener la ejecución de la ruta
    }

        // verificar que el correo electronico tiene formato correcto
    const regexEmailAddress = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm
    if (regexEmailAddress.test(email) === false) {
        res.status(400).json({errorMessage: "El formato de email no es valido."})
        return // detener la ejecución de la ruta
    }

    
    
    //* crear el usuario
    try {

        // verificar que el email sea unico
        const foundUser = await User.findOne( { email: email } )
        if (foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con ese correo electronico"})
            return // detener la ejecución de la ruta
        }

        // cifrar la contraseña
        const encryptedPassword = await bcryptjs.hash(password, 12)
        
        await User.create({
            name: name,
            surname: surname,
            username: username,
            dateOfBirth: dateOfBirth,
            email: email,
            password: encryptedPassword,
        })
        res.sendStatus(201);
 
    } catch (error) {
        next(error)
    }

})

// POST "/api/auth/login" => autenticación del usuario y envio del token
router.post("/login", async (req, res, next) => {

    const { email, password } = req.body

    // verificación de los campos obligatorios
    if(!email || !password) {
        res.status(400).json({errorMessage: "Correo electronico y contraseña son campos obligatorios"})
        return // detener la ejecución de la ruta
    }

    try {

        // verificar que el usuario existe en la base de datos
        const foundUser = await User.findOne({email: email})
        console.log(foundUser)
        if(foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no encontrado con ese correo electronico"})
            return // detener la ejecución de la ruta
        }

        // verificar que la contraseña es correcta
        const isPasswordCorrect = await bcryptjs.compare(password, foundUser.password)
        if(isPasswordCorrect === false){
            res.status(400).json({errorMessage: "Contraseña incorrecta"})
            return // detener la ejecución de la ruta
        } 

        // HASTA AQUI YA HEMOS AUTENTICADO AL USUARIO🧑🏻‍💻🎉
        // A partir de este punto, le vamos a entregar al usuario su llave virtual🔐

        const payload = {
            _id: foundUser._id,
            email: foundUser.email
        } // El payload es toda información estatica que identifica al usuario

        const tokenConfig = {
            algorithm: "HS256",
            expiresIn: "7d"
        }

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig)

        res.status(202).json({authToken: authToken})

    } catch (error) {
        next(error)
    }



})

// GET "/api/auth/verify" => validación del token
router.get("/verify", verifyToken, (req, res, next) => {

    // Esta ruta solo se usa para verificar el token una vez cuando el usuario está navegando por primera vez por la web.
    // Se usa para indicar al front que el usuario es valido y quien es ese usuario.

    res.status(202).json({ payload: req.payload })

})

module.exports = router; 