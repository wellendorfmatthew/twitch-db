const express = require("express");
const {
  getEachStreamersFollowers,
  getEachStreamersGame,
  getEachStreamersPeakViewers,
  getStreamers,
  getStreamersByLanguage,
  getStreamersByTag,
} = require("../controllers/streamersController");

const router = express.Router();

router.get("/", getStreamers);
router.get("/followers", getEachStreamersFollowers);
router.get("/game", getEachStreamersGame);
router.get("/peakViewers", getEachStreamersPeakViewers);
router.get("/language/:lang", getStreamersByLanguage);
router.get("/tags/:tag", getStreamersByTag);

module.exports = router;
