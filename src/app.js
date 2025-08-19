import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(json());
app.use(cors());

import songsRouter from "./routes/songs.js";
import playlistsRouter from "./routes/playlists.js";

app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);

connect(process.env.MONGO_URI);

export default app;
