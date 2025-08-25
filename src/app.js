import express, { json } from "express";
import connectDB from "./utils/db.js";
import { MONGO_URI, ENV } from "./utils/config.js";
import { setupLogger } from "./utils/logger.js";
import { errorHandler, mongoErrorHandler } from "./utils/middleware.js";

import cors from "cors";

connectDB();

const app = express();

app.use(cors());
app.use(json());


import songsRouter from "./routes/songs.js";
import playlistsRouter from "./routes/playlists.js";

setupLogger(app, ENV);

app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);

app.use(mongoErrorHandler);
app.use(errorHandler);

export default app;
