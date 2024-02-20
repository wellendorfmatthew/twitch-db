const express = require("express");
const { getTopFiveGames } = require("../controllers/gamesController");

const router = express.Router();

router.get("/", getTopFiveGames);

module.exports = router;
