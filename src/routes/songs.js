import { Router } from "express";
import Song from "../models/Song.js";
const router = Router();
import formatResponse from "../utils/response_formater.js";
import { asyncHandler } from "../utils/async_handler.js";
import { NotFoundError } from "../utils/app_errors.js";

// create a new song
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const song = await Song.create(req.body);
    res.status(201).json(formatResponse(song));
  })
);

// List all songs
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.json(formatResponse(songs));
});

// Get song by ID
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const song = await Song.findOne({ id: req.params.id });
    if (!song)
      throw new NotFoundError(
        `Song with ID ${req.params.id} not found`,
        req.originalUrl
      );
    res.json(formatResponse(song));
  })
);

// Update song by ID
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const song = await Song.findOne({ id: req.params.id });
    if (!song)
      throw new NotFoundError(
        `Song with ID ${req.params.id} not found`,
        req.originalUrl
      );
    Object.assign(song, req.body);
    await song.save();
    res.json(formatResponse(song));
  })
);

// Delete song by ID
router.delete("/:id", async (req, res, next) => {
  const song = await Song.findOneAndDelete({ id: req.params.id });
  if (!song) next(new Error("Song not found"));
  res.json({ message: "Song deleted" });
});

export default router;
