require("dotenv").config();
const express = require("express");
const cors = require("cors");
const gamesRoutes = require("./routes/gamesRoutes");
const streamerRoutes = require("./routes/streamerRoutes");
const streamersRoutes = require("./routes/streamersRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/streamers", streamersRoutes);
app.use("/streamer", streamerRoutes);
app.use("/games", gamesRoutes);

// Provides an access token to use the Twitch API
app.post("/twitchaccess", async (req, res) => {
  try {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Retrieve a video from a streamer(maybe)

// Retrieve channel information about a streamer(maybe)

// Starts the server
try {
  app.listen(process.env.PORT);
  console.log("Server on");
} catch (error) {
  console.log("Coudn't start server: ", error);
}
