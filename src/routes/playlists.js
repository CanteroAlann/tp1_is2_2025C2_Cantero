import { Router } from "express";
import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
const router = Router();

// create a new playlist (publishes it immediately)
router.post("/", async (req, res) => {
  const playlist = await Playlist.create(req.body);
  res.status(201).json(playlist);
});

// Get song's playlist by ID
router.post("/:id/songs", async (req, res) => {
  const playlist = await Playlist.findOne({ id: req.params.id });
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });

  const song = await Song.findById(req.body.songId);
  if (!song) return res.status(404).json({ error: "Song not found" });

  playlist.songs.unshift({ song: song._id });
  await playlist.save();

  res.json(playlist);
});

// List all playlists published
router.get("/", async (req, res) => {
  const playlists = await Playlist.find()
    .populate("songs.song")
    .sort({ publishedAt: -1 });

  playlists.forEach((pl) => {
    pl.songs.sort((a, b) => b.addedAt - a.addedAt);
  });

  res.json(playlists);
});

export default router;
