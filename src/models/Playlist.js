import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const playlistSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  description: String,
  publishedAt: { type: Date, default: Date.now },
  songs: [
    {
      song: { type: Schema.Types.ObjectId, ref: "Song" },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

export default model("Playlist", playlistSchema);
