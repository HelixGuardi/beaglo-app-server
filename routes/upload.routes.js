const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary.config.js");
const multer = require("multer");
const { verifyToken } = require("../middlewares/auth.middlewares.js");

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload -> Subir imagen a Cloudinary
router.post('/', upload.single('file'), verifyToken, async (req, res, next) => {
  try {
    console.log(req.file); // Verifica que el archivo se esté recibiendo

    // Subir el archivo a Cloudinary usando el buffer
    cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // "auto" detecta el tipo de archivo
      async (error, result) => {
        if (error) {
          console.log("Error uploading to Cloudinary:", error);
          return next(error);
        }
        res.status(200).json(result); // Devuelve la respuesta de Cloudinary
      }
    ).end(req.file.buffer); // Pasa el buffer de la imagen a Cloudinary

  } catch (error) {
    next(error);
  }
});

module.exports = router;