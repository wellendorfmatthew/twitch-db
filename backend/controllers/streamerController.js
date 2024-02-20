// Retrieve data on one streamer
const getStreamer = async (req, res) => {
  const { name } = req.params;
  try {
    const responseOne = await fetch(
      `https://api.twitch.tv/helix/search/channels?query=${name}&first=1`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.access_token,
          "Client-Id": process.env.client_id,
        },
      }
    );
    const dataOne = await responseOne.json();
    const responseTwo = await fetch(
      `https://api.twitch.tv/helix/users?id=${dataOne.data[0].id}`,
      {
        // Gets streamer data from users route
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          "Client-Id": process.env.CLIENT_ID,
        },
      }
    );
    const dataTwo = await responseTwo.json();
    const dataContainer = [dataOne.data[0]]; // Gets streamer data from initial fetch

    for (const property in dataTwo.data[0]) {
      if (!dataOne.data[0].hasOwnProperty(property)) {
        // Determines whether there are new properties to add from the second response to the first response
        dataContainer[0][property] = dataTwo.data[0][property];
      }
    }

    console.log("is this working ", dataContainer);
    return dataContainer;
  } catch (error) {
    return error;
  }
};

// Retrieves peak viewers for selected streamers FIX: Doesn't display peak viewers just data from the /users path
const getStreamerPeakViewers = async (req, res) => {
  let url = "https://api.twitch.tv/helix/users";
  if (Array.isArray(req.query.id)) {
    // If there's an array go through each streamer otherwise just get results for one streamer
    req.query.id.forEach((id) => {
      // Go through the array in the req.query id property and create the link
      if (req.query.id.indexOf(id) === 0) {
        url += `?id=${id}`;
      } else {
        url += `&id=${id}`;
      }
    });
  } else {
    url += `?id=${req.query.id}`;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.ACCESS_TOKEN,
        "Client-Id": process.env.CLIENT_ID,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

// Retrieves a streamer's or multiple streamers amount of followers
// Returns the id and number of followers the streamer has
const getStreamersFollowers = async (req, res) => {
  const { id } = req.query;
  const listOfStreamers = []; // If multiple add them to this array so you can compare later on
  try {
    if (Array.isArray(id)) {
      // If an array there are multiple people so go through them and get their follower counts to add to the list
      id.forEach(async (streamerID) => {
        const response = await fetch(
          `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${streamerID}&first=1`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.ACCESS_TOKEN,
              "Client-Id": process.env.CLIENT_ID,
            },
          }
        );
        const data = await response.json();
        listOfStreamers.push({ id: streamerID, total: data.total }); // Associate the follower count with the streamer's broadcaster_id
      });
      console.log(listOfStreamers);
      return listOfStreamers;
    } else {
      // Get the individual streamers follower count
      const response = await fetch(
        `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            "Client-Id": process.env.CLIENT_ID,
          },
        }
      );
      const data = await response.json();
      console.log({ id: id, total: data.total });
      return { id: id, total: data.total };
    }
  } catch (error) {
    return error;
  }
};

// Gets 5 streamers that a specified streamer follows
// Requires a user access token with user:read:follows
const getFollowedStreamers = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams/followed?user_id=${id}&first=5`,
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
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

// Get the game a streamer or streamers are playing
const getStreamerGame = async (req, res) => {
  const { name } = req.query;

  try {
    const responseOne = await fetch(
      `https://api.twitch.tv/helix/search/channels?query=${name}&first=1`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.access_token,
          "Client-Id": process.env.client_id,
        },
      }
    );
    const dataOne = await responseOne.json();
    const gameId = dataOne.data[0].game_id;
    const responseTwo = await fetch(
      `https://api.twitch.tv/helix/games?id=${gameId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.access_token,
          "Client-Id": process.env.client_id,
        },
      }
    );
    const dataTwo = await responseTwo.json();
    res.json(dataTwo);
    console.log(dataTwo);
  } catch (error) {
    res.json(error);
  }
};

// Retrieves a streamers top 3 clips
const getStreamerClips = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/clips?broadcaster_id=${id}&first3`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          "Client-Id": process.env.CLIENT_ID,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// Retrieve a streamers stream schedule
// 404 means no schedule made so if you don't get a 200 just assume no schedule or not available at the moment
const getStreamerSchedule = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/schedule?broadcaster_id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          "Client-Id": process.env.CLIENT_ID,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getFollowedStreamers,
  getStreamer,
  getStreamerClips,
  getStreamerGame,
  getStreamerPeakViewers,
  getStreamerSchedule,
  getStreamersFollowers,
};
