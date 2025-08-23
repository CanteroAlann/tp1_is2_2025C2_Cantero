import { Router } from "express";
import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import formatResponse from "../utils/response_formater.js";
import { asyncHandler } from "../utils/async_handler.js";
import { NotFoundError } from "../utils/app_errors.js";
import { validateAddSongSchema } from "../utils/schema_validator.js";

const router = Router();

// create a new playlist (publishes it immediately)
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const playlist = await Playlist.create(req.body);
    res.status(201).json(formatResponse(playlist));
  })
);

// Get song's playlist by ID
router.post(
  "/:id/songs",
  asyncHandler(async (req, res) => {
    const playlist = await Playlist.findOne({ id: req.params.id }).populate(
      "songs.song"
    );
    if (!playlist)
      throw new NotFoundError(
        `Playlist with ID ${req.params.id} not found`,
        req.originalUrl
      );
    validateAddSongSchema(req.body, req.originalUrl);
    const song = await Song.findOne({ id: req.body.songId });
    if (!song)
      throw new NotFoundError(
        `Song with ID ${req.body.songId} not found`,
        req.originalUrl
      );

    playlist.songs.unshift({ song: song });
    await playlist.save();

    res.json(formatResponse(playlist));
  })
);

// Get playlist by ID
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const playlist = await Playlist.findOne({ id: req.params.id });
    if (!playlist)
      throw new NotFoundError(
        `Playlist with ID ${req.params.id} not found`,
        req.originalUrl
      );
    res.json(formatResponse(playlist));
  })
);

// List all playlists published
router.get("/", async (req, res) => {
  const playlists = await Playlist.find()
    .populate("songs.song")
    .sort({ publishedAt: -1 });

  playlists.forEach((pl) => {
    pl.songs.sort((a, b) => b.addedAt - a.addedAt);
  });

  res.json(formatResponse(playlists));
});

// delete a playlist by ID
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const playlist = await Playlist.findOneAndDelete({ id: req.params.id });
    if (!playlist)
      throw new NotFoundError(
        `Playlist with ID ${req.params.id} not found`,
        req.originalUrl
      );
    res.status(204).end();
  })
);

export default router;
