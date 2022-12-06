const { getGenres } = require ("./controllers");
const express = require ("express");
const router = express.Router();


router.get("/", async ( req, res ) => {
    try {
    const allgenres = await getGenres();
    res.status(200).send(allgenres);

    } catch (error) {
        res.status(404).send(error.message);
      }
});

module.exports = router;