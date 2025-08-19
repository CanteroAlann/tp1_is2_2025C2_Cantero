import { Router } from "express";
import { create, findById, find } from "../models/Playlist";
import { findById as _findById } from "../models/Song";
const router = Router();

// Crear playlist (se publica automáticamente)
router.post("/", async (req, res) => {
  const playlist = await create(req.body);
  res.status(201).json(playlist);
});

// Agregar canción a playlist
router.post("/:id/songs", async (req, res) => {
  const playlist = await findById(req.params.id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });

  const song = await _findById(req.body.songId);
  if (!song) return res.status(404).json({ error: "Song not found" });

  playlist.songs.unshift({ song: song._id });
  await playlist.save();

  res.json(playlist);
});

// Listar playlists publicadas
router.get("/", async (req, res) => {
  const playlists = await find()
    .populate("songs.song")
    .sort({ publishedAt: -1 });

  playlists.forEach((pl) => {
    pl.songs.sort((a, b) => b.addedAt - a.addedAt);
  });

  res.json(playlists);
});

export default router;
