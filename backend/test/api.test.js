const { getTopFiveGames } = require("../controllers/gamesController");
const {
  getStreamer,
  getStreamersFollowers,
  getStreamerClips,
} = require("../controllers/streamerController");

// For game routes
describe("games controllers", () => {
  test("test getting the top 5 games", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: [
          {
            id: "1",
            name: "PUBG: BATTLEGROUNDS",
            box_art_url:
              "https://static-cdn.jtvnw.net/ttv-boxart/493057-{width}x{height}.jpg",
            igdb_id: "1",
          },
          {
            id: "1",
            name: "Lethal Company",
            box_art_url:
              "https://static-cdn.jtvnw.net/ttv-boxart/493057-{width}x{height}.jpg",
            igdb_id: "1",
          },
          {
            id: "1",
            name: "Final Fantasy VII Remake",
            box_art_url:
              "https://static-cdn.jtvnw.net/ttv-boxart/493057-{width}x{height}.jpg",
            igdb_id: "1",
          },
          {
            id: "1",
            name: "Persona 3 Reload",
            box_art_url:
              "https://static-cdn.jtvnw.net/ttv-boxart/493057-{width}x{height}.jpg",
            igdb_id: "1",
          },
          {
            id: "1",
            name: "Honkai: Star Rail",
            box_art_url:
              "https://static-cdn.jtvnw.net/ttv-boxart/493057-{width}x{height}.jpg",
            igdb_id: "1",
          },
        ],
        pagination: { cursor: "eyJiIjpudWxsLCJhIjp7Ik9mZnNldCI6MjB9fQ==" },
      }),
    });
    const games = await getTopFiveGames();
    const listo = games.data.map((game) => {
      return game.name;
    });
    expect(listo).toEqual([
      "PUBG: BATTLEGROUNDS",
      "Lethal Company",
      "Final Fantasy VII Remake",
      "Persona 3 Reload",
      "Honkai: Star Rail",
    ]);
  });
});

// For streamer route
describe("streamer controllers", () => {
  test("get an individual streamer data", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: async () => ({
          data: [
            {
              broadcaster_language: "en",
              broadcaster_login: "dummyPerson",
              display_name: "dummyPerson",
              game_id: "1",
              game_name: "Just Chatting",
              id: "1",
              is_live: false,
              tag_ids: [],
              tags: [],
              thumbnail_url:
                "https://static-cdn.jtvnw.net/jtv_user_pictures/fd17325a-7dc2-46c6-8617-e90ec259501c-profile_image-300x300.png",
              title: "dummyPerson",
              started_at: "",
            },
          ],
          pagination: {
            cursor: "Mg==",
          },
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          data: [
            {
              id: "1",
              login: "dummyPerson",
              display_name: "dummyPerson",
              type: "",
              broadcaster_type: "partner",
              description: "Vtuber dayo",
              profile_image_url:
                "https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
              offline_image_url:
                "https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png",
              view_count: 69,
              email: "not-real@email.com",
              created_at: "2069-12-14T20:32:28Z",
            },
          ],
        }),
      });
    const result = [
      {
        broadcaster_language: "en",
        broadcaster_login: "dummyPerson",
        broadcaster_type: "partner",
        created_at: "2069-12-14T20:32:28Z",
        description: "Vtuber dayo",
        display_name: "dummyPerson",
        email: "not-real@email.com",
        game_id: "1",
        game_name: "Just Chatting",
        id: "1",
        is_live: false,
        login: "dummyPerson",
        offline_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png",
        profile_image_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
        started_at: "",
        tag_ids: [],
        tags: [],
        thumbnail_url:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/fd17325a-7dc2-46c6-8617-e90ec259501c-profile_image-300x300.png",
        title: "dummyPerson",
        type: "",
        view_count: 69,
      },
    ];
    const streamer = await getStreamer({ params: { name: "dummyPerson" } });
    expect(streamer).toEqual(result);
  });
  test("get a streamers amount of followers", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        total: 100000,
      }),
    });
    const result = await getStreamersFollowers({ query: { id: 1 } });
    expect(result).toEqual({ id: 1, total: 100000 });
  });
  test("get a streamers top 3 clips", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: [
          {
            id: "RandomClip1",
            url: "https://clips.twitch.tv/beepboop",
            embed_url: "https://clips.twitch.tv/embed?clip=RandomClip1",
            broadcaster_id: "1",
            broadcaster_name: "dummyPerson",
            creator_id: "1",
            creator_name: "dummyPerson",
            video_id: "",
            game_id: "1",
            language: "en",
            title: "random1",
            view_count: 10,
            created_at: "2017-11-30T22:34:18Z",
            thumbnail_url:
              "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
            duration: 12.9,
            vod_offset: 1957,
            is_featured: true,
          },
          {
            id: "RandomClip2",
            url: "https://clips.twitch.tv/beepboop",
            embed_url: "https://clips.twitch.tv/embed?clip=RandomClip1",
            broadcaster_id: "1",
            broadcaster_name: "dummyPerson",
            creator_id: "1",
            creator_name: "dummyPerson",
            video_id: "",
            game_id: "1",
            language: "en",
            title: "random1",
            view_count: 10,
            created_at: "2017-11-30T22:34:18Z",
            thumbnail_url:
              "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
            duration: 12.9,
            vod_offset: 1957,
            is_featured: true,
          },
          {
            id: "RandomClip3",
            url: "https://clips.twitch.tv/beepboop",
            embed_url: "https://clips.twitch.tv/embed?clip=RandomClip1",
            broadcaster_id: "1",
            broadcaster_name: "dummyPerson",
            creator_id: "1",
            creator_name: "dummyPerson",
            video_id: "",
            game_id: "1",
            language: "en",
            title: "random1",
            view_count: 10,
            created_at: "2017-11-30T22:34:18Z",
            thumbnail_url:
              "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
            duration: 12.9,
            vod_offset: 1957,
            is_featured: true,
          },
        ],
        pagination: {
          cursor: "eyJiIjpudWxsLCJhIjoiIn0",
        },
      }),
    });
    const result = {
      data: [
        {
          id: "RandomClip1",
          url: "https://clips.twitch.tv/beepboop",
          embed_url: "https://clips.twitch.tv/embed?clip=RandomClip1",
          broadcaster_id: "1",
          broadcaster_name: "dummyPerson",
          creator_id: "1",
          creator_name: "dummyPerson",
          video_id: "",
          game_id: "1",
          language: "en",
          title: "random1",
          view_count: 10,
          created_at: "2017-11-30T22:34:18Z",
          thumbnail_url:
            "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
          duration: 12.9,
          vod_offset: 1957,
          is_featured: true,
        },
        {
          id: "RandomClip2",
          url: "https://clips.twitch.tv/beepboop",
          embed_url: "https://clips.twitch.tv/embed?clip=RandomClip1",
          broadcaster_id: "1",
          broadcaster_name: "dummyPerson",
          creator_id: "1",
          creator_name: "dummyPerson",
          video_id: "",
          game_id: "1",
          language: "en",
          title: "random1",
          view_count: 10,
          created_at: "2017-11-30T22:34:18Z",
          thumbnail_url:
            "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
          duration: 12.9,
          vod_offset: 1957,
          is_featured: true,
        },
        {
          id: "RandomClip3",
          url: "https://clips.twitch.tv/beepboop",
          embed_url: "https://clips.twitch.tv/embed?clip=RandomClip1",
          broadcaster_id: "1",
          broadcaster_name: "dummyPerson",
          creator_id: "1",
          creator_name: "dummyPerson",
          video_id: "",
          game_id: "1",
          language: "en",
          title: "random1",
          view_count: 10,
          created_at: "2017-11-30T22:34:18Z",
          thumbnail_url:
            "https://clips-media-assets.twitch.tv/157589949-preview-480x272.jpg",
          duration: 12.9,
          vod_offset: 1957,
          is_featured: true,
        },
      ],
      pagination: {
        cursor: "eyJiIjpudWxsLCJhIjoiIn0",
      },
    };
    const clips = await getStreamerClips({ query: { id: 1 } });
    expect(clips).toEqual(result);
  });
});
