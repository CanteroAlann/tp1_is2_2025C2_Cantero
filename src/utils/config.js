import { config } from "dotenv";

const result = config();

let MONGO_URI = process.env.MONGO_URI;
let PORT = process.env.PORT || 8080;
let ENV = process.env.ENVIRONMENT || "development";

export { MONGO_URI, PORT, ENV };
