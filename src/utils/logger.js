import morgan from "morgan";
import fs from "fs";
import path from "path";

export function setupLogger(app, env) {
  if (env === "production") {
    const accessLogStream = fs.createWriteStream(
      path.join(process.cwd(), "access.log"),
      { flags: "a" }
    );
    app.use(morgan("combined", { stream: accessLogStream }));
  } else {
    app.use(morgan("dev"));
  }
}
