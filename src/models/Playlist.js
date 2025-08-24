import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const playlistSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true, minlength: 50, maxlength: 255 },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null },
  songs: {
    type: [
      {
        song: { type: Schema.Types.ObjectId, ref: "Song" },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

playlistSchema.set("toJSON", {
  transform: (_, ret) => {
    return {
      id: ret.id,
      name: ret.name,
      description: ret.description,
      isPublished: ret.isPublished,
      publishedAt: ret.publishedAt,
      songs: ret.songs
        .filter((s) => s.song !== null)
        .map((s) => ({
          id: s.song.id,
          title: s.song.title,
          artist: s.song.artist,
          addedAt: s.addedAt,
        })),
    };
  },
});

export default model("Playlist", playlistSchema);
