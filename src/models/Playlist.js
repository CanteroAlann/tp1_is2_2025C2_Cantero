import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const playlistSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  songs: [
    {
      song: { type: Schema.Types.ObjectId, ref: "Song" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

playlistSchema.set("toJSON", {
  transform: (_, ret) => {
    return {
      id: ret.id,
      name: ret.name,
      description: ret.description,
      isPublished: ret.publishedAt ? true : false,
      publishedAt: ret.publishedAt,
      songs: ret.songs.map((s) => ({
        id: s.song.id,
        title: s.song.title,
        artist: s.song.artist,
        addedAt: s.addedAt,
      })),
    };
  },
});

export default model("Playlist", playlistSchema);
