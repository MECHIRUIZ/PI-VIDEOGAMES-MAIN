const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const fetch = require("cross-fetch");
const axios = require("axios");

/*************************************** VIDEOGAME recibo por query *************************** */

const getVideoGames = async () => {
  try {
    const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
    const promise1 = fetch(URL).then((response) => response.json());
    const promise2 = fetch(URL + "&page=2").then((response) => response.json());
    const promise3 = fetch(URL + "&page=3").then((response) => response.json());
    const promise4 = fetch(URL + "&page=4").then((response) => response.json());
    const promise5 = fetch(URL + "&page=5").then((response) => response.json());

    await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(
      (values) => {
        values;
        apiInfo = values[0].results
          .concat(values[1].results)
          .concat(values[2].results)
          .concat(values[3].results)
          .concat(values[4].results);
      }
    );

    const apiGames = await apiInfo.map((element) => {
      return {
        id: element.id,
        name: element.name,
        released: element.released,
        image: element.background_image,
        rating: element.rating,
        platforms: element.platforms.map((p) => p.platform.name),
        genres: element.genres.map((g) => g.name),
      };
    });
    const dbGames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        throught: {
          attributes: [],
        },
      },
    });
    const allGames = apiGames.concat(dbGames);

    const listGames = allGames.map((e) => {
      return {
        name: e.name,
        id: e.id,
        released: e.released,
        image: e.image,
        platforms: e.platforms,
        genres: e.genres,
        rating: e.rating,
        createInDb: e.createInDb,
      };
    });
    return listGames;
  } catch (error) {
    return error.status(404);
  }
};

/************************* recibo por id ****************************** */

const videogameId = async (id) => {
  if (!isNaN(id)) {
    const responseApi = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => data);

    
    const gameApiInfo = {
        image: responseApi.background_image,
        name: responseApi.name,
        genres: responseApi.genres,
        description: responseApi.description,
        released: responseApi.released,
        rating: responseApi.rating,
        platforms: responseApi.platforms.map((p) => p.platform.name).toString(),
        
      };
      return gameApiInfo;
  }
  const responseDb = await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  }) 
    if(!responseDb){
      return "no se encontro el juego";
    
  }
  const gameDbInfo = {
    image: responseDb.image,
    name: responseDb.name,
    genres: responseDb.genres,
    description: responseDb.description,
    released: responseDb.released,
    rating: responseDb.rating,
    platforms: responseDb.platforms,
    createInDb: responseDb.createInDb,
  };
  
  return gameDbInfo;
 
};

/***************************************** GENRES *****************************/

const getGenres = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => data);

    const apiGInfo = await response.results.map((element) => element.name);

    /// lo agrego a la db
    apiGInfo.map((element) =>
      Genre.findOrCreate({
        where: { name: element },
      })
    );

    const allGenres = await Genre.findAll();
    return allGenres;
  } catch (error) {
    return error;
  }
};

module.exports = { getVideoGames, getGenres, videogameId };
