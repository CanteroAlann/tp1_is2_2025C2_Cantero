import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const songSchema = new Schema(
  {
    id: { type: String, default: uuidv4, unique: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Song", songSchema);
