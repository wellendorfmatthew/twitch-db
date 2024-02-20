// Retrieve top 5 games
const getTopFiveGames = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.twitch.tv/helix/games/top?first=5",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          "Client-Id": process.env.CLIENT_ID,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { getTopFiveGames };
