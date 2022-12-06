const { Router } = require("express");
const express = require ("express");
const videoGamesRouter = require("./videogames")
const genresRouter = require ("./genres")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use(express.json());



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames" , videoGamesRouter);
router.use("/genres", genresRouter )



module.exports = router;
