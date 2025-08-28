import morgan from "morgan";
import fs from "fs";
import path from "path";

/**
 * this function sets up logging for an Express application using Morgan.
 * for production, it logs in 'combined' format to 'access.log'.
 * for development, it logs in 'dev' format to the console.
 * for other environments, no logging is set up.
 *
 * @export
 * @param {*} app
 * @param {*} env
 */
export function setupLogger(app, env) {
  if (env === "production") {
    const accessLogStream = fs.createWriteStream(
      path.join(process.cwd(), "access.log"),
      { flags: "a" }
    );
    app.use(morgan("combined", { stream: accessLogStream }));
  }
  if (env === "development") {
    app.use(morgan("dev"));
  }
}
