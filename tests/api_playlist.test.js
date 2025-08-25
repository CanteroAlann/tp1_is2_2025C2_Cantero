import request from "supertest";
import app from "../src/app.js";
import Playlist from "../src/models/Playlist.js";
import Song from "../src/models/Song.js";
import connectDB from "../src/utils/db.js";
beforeAll(async () => {
  await connectDB();
  await Playlist.deleteMany({});
  await Song.deleteMany({});
});

beforeEach(async () => {
  await Playlist.deleteMany({});
  await Song.deleteMany({});
});

afterAll(async () => {
  await Playlist.deleteMany({});
  await Song.deleteMany({});
  await Promise.all([Playlist.db.close(), Song.db.close()]);
});

describe("API Playlists", () => {
  it("should create a playlist and shouldn't be published", async () => {
    const res = await request(app).post("/playlists").send({
      name: "My Playlist",
      description:
        "A personal collection of songs that capture my mood, inspire creativity, and set the vibe for any moment.",
    });
    const publishedList = await request(app).get("/playlists").query({ published: "false" });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("My Playlist");
    expect(res.body.data.description).toBe(
      "A personal collection of songs that capture my mood, inspire creativity, and set the vibe for any moment."
    );
    expect(res.body.data.isPublished).toBe(false);
    expect(res.body.data.publishedAt).toBe(null);
    expect(publishedList.body.data.length).toBe(1);
    expect(publishedList.body.data[0].name).toBe("My Playlist");
    expect(publishedList.body.data[0].description).toBe(res.body.data.description);
  

  });
  it("should not create a playlist with short description", async () => {
    const res = await request(app).post("/playlists").send({
      name: "Short Desc Playlist",
      description: "Too short",
    });
    expect(res.status).toBe(400);
  });

  it("should not create a playlist with long description", async () => {
    const longDescription = "A".repeat(300); // 300 characters long
    const res = await request(app).post("/playlists").send({
      name: "Long Desc Playlist",
      description: longDescription,
    });
    expect(res.status).toBe(400);
  });

  it("should list all playlists published", async () => {
    const firstPlaylist = await request(app).post("/playlists").send({
      name: "Published Playlist",
      description:
        "A vibrant collection of songs that bring energy and excitement to any occasion, perfect for sharing with friends and family.",
    });
    expect(firstPlaylist.status).toBe(201);
    const publishRes = await request(app).post(`/playlists/${firstPlaylist.body.data.id}/publish`);
    expect(publishRes.status).toBe(200);
    const secondPlaylist = await request(app).post("/playlists").send({
      name: "Unpublished Playlist",
      description:
        "A hidden gem of tracks that I keep to myself, a secret soundtrack for my personal moments and reflections.",
    });
    expect(secondPlaylist.status).toBe(201);
    const thirdPlaylist = await request(app).post("/playlists").send({
      name: "Another Published Playlist",
      description:
        "An eclectic mix of tunes that span genres and eras, creating a unique listening experience that's both nostalgic and fresh.",
    });
    expect(thirdPlaylist.status).toBe(201);
    const publishRes2 = await request(app).post(`/playlists/${thirdPlaylist.body.data.id}/publish`);
    expect(publishRes2.status).toBe(200);
    const res = await request(app).get("/playlists").query({ published: "true" , sort : 'publishedAt' });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].name).toBe("Another Published Playlist");
    expect(res.body.data[0].isPublished).toBe(true);
    expect(res.body.data[0].publishedAt).toBe(publishRes2.body.data.publishedAt);
    expect(res.body.data[1].name).toBe("Published Playlist");
    expect(res.body.data[1].isPublished).toBe(true);
    expect(res.body.data[1].publishedAt).toBe(publishRes.body.data.publishedAt);

  });

  it("should get a playlist by ID", async () => {
    const newPlaylist = await Playlist.create({
      name: "Chill Vibes",
      description:
        "A smooth and relaxing blend of mellow tracks perfect for unwinding, focusing, or enjoying peaceful moments.",
    });
    const res = await request(app).get(`/playlists/${newPlaylist.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Chill Vibes");
  });

  it("should be idempotent when publishing the same playlist", async () => {
    const playlistData = {
      name: "Idempotent Playlist",
      description:
        "A unique collection of songs that remains unchanged no matter how many times you try to publish it.",
    };
    const createPlaylist = await request(app).post("/playlists").send(playlistData);
    expect(createPlaylist.status).toBe(201);
    const id_of_list = createPlaylist.body.data.id;
    const firstPublish = await request(app).post(`/playlists/${id_of_list}/publish`);
    expect(firstPublish.status).toBe(200);
    const secondPublish = await request(app).post(`/playlists/${id_of_list}/publish`);
    expect(secondPublish.status).toBe(200);
    expect(firstPublish.body.data.isPublished).toBe(true);
    expect(secondPublish.body.data.isPublished).toBe(true);
    expect(firstPublish.body.data.publishedAt).toBe(
      secondPublish.body.data.publishedAt
    );
  });


  it("should add a song to a playlist", async () => {
    const newPlaylist = await Playlist.create({
      name: "Workout Mix",
      description:
        "An energetic mix of beats and rhythms to keep you motivated and moving throughout every workout session.",
    });
    const song = await Song.create({
      title: "Eye of the Tiger",
      artist: "Survivor",
    });

    const res = await request(app)
      .post(`/playlists/${newPlaylist.id}/songs`)
      .send({ songId: song.id });
    expect(res.status).toBe(200);
    expect(res.body.data.songs.length).toBeGreaterThan(0);
  });

  it("should delete a playlist by ID", async () => {
    const newPlaylist = await Playlist.create({
      name: "Party Hits",
      description:
        "A high-energy mix of party anthems and dance tracks to keep the celebration alive from start to finish.",
    });
    const res = await request(app).delete(`/playlists/${newPlaylist.id}`);
    expect(res.status).toBe(204);
  });
});
