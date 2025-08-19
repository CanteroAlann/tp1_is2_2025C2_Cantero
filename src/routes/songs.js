import { Router } from "express";
import Song from "../models/Song.js";
const router = Router();

// create a new song
router.post("/", async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
});

// List all songs
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// Get song by ID
router.get("/:id", async (req, res) => {
  const song = await Song.findOne({ id: parseInt(req.params.id, 10) });
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
});

// Update song by ID
router.put("/:id", async (req, res) => {
  const song = await Song.findOneAndUpdate(
    { id: parseInt(req.params.id, 10) },
    req.body,
    {
      new: true,
    }
  );
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
});

// Delete song by ID
router.delete("/:id", async (req, res) => {
  const song = await Song.findOneAndDelete({ id: parseInt(req.params.id, 10) });
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json({ message: "Song deleted" });
});

export default router;
