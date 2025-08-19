import { Schema, model } from "mongoose";

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Song", songSchema);
