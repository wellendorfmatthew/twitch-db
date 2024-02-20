// Retrieve top 5 streamers(Based on viewership from latest or live stream)
const getStreamers = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.twitch.tv/helix/streams?first=5",
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

// Retrieve streamers of a specified tag(Default search that displays 5)
const getStreamersByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    /* Twitch API has limited query options so in order to retrieve streamers of a certain tag you need to 
         get every streamer.
      */
    const response = await fetch(
      "https://api.twitch.tv/helix/streams?first=100",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          "Client-Id": process.env.CLIENT_ID,
        },
      }
    );
    const data = await response.json();
    const streamers = data.data.filter((streamer) => {
      // Filter the retrieved streamers by if they have the Vtuber tag
      if (streamer.tags.includes(tag)) {
        return streamer;
      }
    });
    let nextPage = data.pagination.cursor; // Amount of results is limited by pages so a cursor is needed to grab results from new pages.
    while (streamers.length < 5) {
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?first=100&after=${nextPage}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            "Client-Id": process.env.CLIENT_ID,
          },
        }
      );
      const data = await response.json();
      for (const i of data.data) {
        // For each new page get streamers of the Vtuber tag and limit the amount to 20
        if (i.tags.includes(tag)) {
          streamers.push(i);
          //   console.log(vtubers);
          //   console.log(vtubers.length);
        }
        if (streamers.length === 5) {
          break;
        }
      }
      nextPage = data.pagination.cursor;
    }
    console.log(streamers);
    console.log(streamers.length);
    res.json(streamers);
  } catch (error) {
    res.json(error);
  }
};

// Retrieve streamers by language (Default search that displays 5)
const getStreamersByLanguage = async (req, res) => {
  const { lang } = req.params;
  try {
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?first=100&`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
          "Client-Id": process.env.CLIENT_ID,
        },
      }
    );
    const data = await response.json();
    const streamers = data.data.filter((streamer) => {
      if (streamer.language === lang) {
        return streamer;
      }
    });
    let nextPage = data.pagination.cursor;
    while (streamers.length < 5) {
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?first=100&after=${nextPage}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            "Client-Id": process.env.CLIENT_ID,
          },
        }
      );
      const data = await response.json();
      for (const i of data.data) {
        // For each new page get streamers of the Vtuber tag and limit the amount to 20
        if (i.language === lang) {
          streamers.push(i);
          //   console.log(vtubers);
          //   console.log(vtubers.length);
        }
        if (streamers.length === 5) {
          break;
        }
      }
      nextPage = data.pagination.cursor;
    }
    console.log(streamers);
    console.log(streamers.length);
    res.json(streamers);
  } catch (error) {
    res.json(error);
  }
};

// Retrieves peak viewers for selected streamers
// Doesn't work
const getEachStreamersPeakViewers = async (req, res) => {
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
const getEachStreamersFollowers = async (req, res) => {
  const { id } = req.query;
  const listOfStreamers = []; // If multiple add them to this array so you can compare later on
  try {
    if (Array.isArray(id)) {
      // If an array there are multiple people so go through them and get their follower counts to add to the list
      id.forEach(async (streamerID) => {
        const response = await fetch(
          `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${streamerID}`,
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
      res.json(listOfStreamers);
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
      res.json({ id: id, total: data.total });
    }
  } catch (error) {
    res.json(error);
  }
};

// Get the game a streamer or streamers are playing
const getEachStreamersGame = async (req, res) => {
  let urlOne = "https://api.twitch.tv/helix/search/channels";
  const { name } = req.query;

  name.forEach((streamer) => {
    // Go through the array in the req.query id property and create the link
    if (name.indexOf(streamer) === 0) {
      urlOne += `?name=${streamer}`;
    } else {
      urlOne += `&name=${streamer}`;
    }
  });

  const listOfStreamers = name.map((streamer) => {
    return { name: streamer, gameId: "", gameName: "", gameBoxArt: "" };
  });

  try {
    const response = await fetch(urlOne, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.access_token,
        "Client-Id": process.env.client_id,
      },
    });

    const data = await response.json();
    for (const index in data.data) {
      listOfStreamers[index].gameId = data.data[index].game_id;
      listOfStreamers[index].gameName = data.data[index].game_name;
    }

    let urlTwo = "https://api.twitch.tv/helix/games";

    listOfStreamers.forEach((streamer) => {
      // Go through the array in the req.query id property and create the link
      if (listOfStreamers.indexOf(streamer) === 0) {
        urlTwo += `?id=${streamer.gameId}`;
      } else {
        urlTwo += `&id=${streamer.gameId}`;
      }
    });

    const responseTwo = await fetch(urlTwo, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.access_token,
        "Client-Id": process.env.client_id,
      },
    });

    const dataTwo = await responseTwo.json();
    for (const index in dataTwo.data) {
      listOfStreamers[index].gameBoxArt = dataTwo.data[index].box_art_url;
    }
    console.log(listOfStreamers);
    res.json(listOfStreamers);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getEachStreamersFollowers,
  getEachStreamersGame,
  getEachStreamersPeakViewers,
  getStreamers,
  getStreamersByLanguage,
  getStreamersByTag,
};
