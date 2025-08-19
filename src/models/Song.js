import { Schema, model } from "mongoose";

const songSchema = new Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
  },
  { timestamps: true }
);

songSchema.pre("save", function (next) {
  if (this.isNew && !this.id) {
    // Genera un número entero entre 1 y 1,000,000
    this.id = Math.floor(Math.random() * 1000000) + 1;
  }
  next();
});

export default model("Song", songSchema);
