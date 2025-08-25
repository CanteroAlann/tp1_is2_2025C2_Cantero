import { config } from "dotenv";

const result = config();


let PORT = process.env.PORT || 8080;
let ENV = process.env.NODE_ENV || "development";


let MONGO_URI = "";

if (ENV === "development") {
  MONGO_URI = process.env.MONGO_URI_DEV;
} else if (ENV === "test") {
  MONGO_URI = process.env.MONGO_URI_TEST;
} else if (ENV === "production") {
  MONGO_URI = process.env.MONGO_URI_PROD;
}

export { MONGO_URI, PORT, ENV };
