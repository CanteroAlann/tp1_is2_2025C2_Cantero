import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import Playlist from "../src/models/Playlist.js";
import Song from "../src/models/Song.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Playlist.deleteMany({});
  await Song.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("API Playlists", () => {
  it("should create a playlist", async () => {
    const res = await request(app).post("/playlists").send({
      name: "My Playlist",
      description:
        "A personal collection of songs that capture my mood, inspire creativity, and set the vibe for any moment.",
    });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("My Playlist");
    expect(res.body.data.description).toBe(
      "A personal collection of songs that capture my mood, inspire creativity, and set the vibe for any moment."
    );
  });

  it("should list all playlists", async () => {
    const res = await request(app).get("/playlists");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
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
