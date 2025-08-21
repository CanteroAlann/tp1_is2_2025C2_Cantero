import { config } from "dotenv";

config();

let MONGO_URI = process.env.MONGO_URI;
let PORT = process.env.PORT || 8080;
let ENV = process.env.NODE_ENV || "development";

export { MONGO_URI, PORT, ENV };
