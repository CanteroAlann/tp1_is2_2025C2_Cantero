import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import Song from "../src/models/Song.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Song.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("API Songs", () => {
  it("should create a song", async () => {
    const res = await request(app).post("/songs").send({
      title: "Imagine",
      artist: "John Lennon"
    });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Imagine");
    expect(res.body.data.artist).toBe("John Lennon");
});

   it("should list all songs", async () => {
        const res = await request(app).get("/songs");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);

  });

    it("should get a song by ID", async () => {
        const newSong = await Song.create({ title: "Hey Jude", artist: "The Beatles" });
        const res = await request(app).get(`/songs/${newSong.id}`);
        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe("Hey Jude");
        expect(res.body.data.artist).toBe("The Beatles");
    });

    it("should update a song by ID", async () => {
        const newSong = await Song.create({ title: "Let It Be", artist: "The Beatles" });
        const res = await request(app).put(`/songs/${newSong.id}`).send({ title: "Let It Be (Remastered)" , artist: "The Beatles"});
        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe("Let It Be (Remastered)");
    });

    it("should delete a song by ID", async () => {
        const newSong = await Song.create({ title: "Bohemian Rhapsody", artist: "Queen" });
        const res = await request(app).delete(`/songs/${newSong.id}`);
        expect(res.status).toBe(204);

});

});