import { app } from "./app.js";
import { env } from "./config/index.js";
import { logger } from "./utils/logger.js";

const server = app.listen(env.PORT, () => {
  logger.info("Server started", {
    environment: env.NODE_ENV,
    port: env.PORT,
  });
});

server.on("error", (error: Error) => {
  logger.error("Server failed to start", { error: error.message });
  process.exitCode = 1;
});
