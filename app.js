import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";

config();

const app = express();
app.use(json());

app.use("/songs", require("./routes/songs"));
app.use("/playlists", require("./routes/playlists"));

connect(process.env.MONGO_URI);

export default app;
