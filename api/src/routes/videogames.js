const { getVideoGames, getGenres, videogameId } = require("./controllers");
const express = require("express");
const router = express.Router(); 
const { Videogame, Genre } = require ("../db")


router.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      const response = await getVideoGames();
         
      if (name) {
        
        const gameFilter = response.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
  
        return res.status(200).send(gameFilter);
      }
    
      res.status(200).send(response);
      
    } catch (error) {
      res.status(400).send(error);
    }
  })

  router.get("/:id", async (req, res) => {
    try {
      const {id} = req.params;  
      
      const response = await videogameId(id);
      const {name} = response;
     
     if(name === undefined){
      return res.status(400).send("no se encontro el juego")
     }
     return res.status(200).json(response);
    } catch (error) {
      res.status(400).send(error)
    }
  });

router.post("/", async (req, res,) => {
  try {
    const { name, description, released, rating, image, genres, platforms } = req.body; 
      if (!name || !description || !platforms || !image){
        return res.send('Faltan enviar datos obligatorios');
      }
      

    // Valido que el nombre del videojuego no exista
    const findVideogame = await Videogame.findAll({ where: { name: name } });
      if (findVideogame.length != 0) {
        return res.send("Ya existe un juego registrado con ese nombre");
      }
    //Creo el videojuego
    const newVideogame = await Videogame.create({
      name,
      description,
      rating,
      released,
      image,
      platforms,
      genres,
    });

    //Busco el genero en mi db
    const dbGenres = await Genre.findAll({
      where: { name: genres }
    });
    //lo agrego a mi juego creado
    newVideogame.addGenre(dbGenres);
    res.send(newVideogame)
  }
  catch (error) {
    res.status(400).send(error.message)
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
   try {
      const response = await Videogame.findByPk(id);
      await response.destroy(id);
      res.status(200).send("Eliminado con exito");
   } catch (error) {
    res.status(400).send("no se pudo eliminar el juego");
   }

});

module.exports = router;
