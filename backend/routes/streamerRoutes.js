const express = require("express");
const {
  getFollowedStreamers,
  getStreamer,
  getStreamerClips,
  getStreamerGame,
  getStreamerPeakViewers,
  getStreamerSchedule,
  getStreamersFollowers,
} = require("../controllers/streamerController");

const router = express.Router();

router.get("/followers", getStreamersFollowers);
router.get("/followedStreamers", getFollowedStreamers);
router.get("/clips", getStreamerClips);
router.get("/game", getStreamerGame);
router.get("/peakViewers", getStreamerPeakViewers);
router.get("/schedule", getStreamerSchedule);
router.get("/:name", getStreamer);

module.exports = router;
