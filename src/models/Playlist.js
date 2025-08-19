import { Schema, model } from "mongoose";

const playlistSchema = new Schema({
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
