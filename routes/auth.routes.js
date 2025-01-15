const router = require("express").Router();

const User = require("../models/User.model")

// POST "/api/auth/signup" => registrar el usuario
router.post("/signup", async(req, res, next) => {

    // recibir la data del usuario
    console.log(req.body)
    const { name, surname, dateOfBirth, email, password } = req.body

    //* validaciones
        // verificar que la data existe
    if (!name || !surname || !dateOfBirth || !email || !password) {
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

        // verificar que el email sea unico //! PENDIENTE




    //* crear el usuario
    try {
        
        await User.create({
            name: name,
            surname: surname,
            dateOfBirth: dateOfBirth,
            email: email,
            password: password,
        })
        res.sendStatus(201);

    } catch (error) {
        next(error)
    }


    
})

// POST "/api/auth/login" => autenticación del usuario y envio del token

// GET "/api/auth/verify" => validación del token

module.exports = router;