import cors from "cors";
import express, { type Express } from "express";

import { env } from "./config/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { requestContext } from "./middleware/request-context.js";
import { apiRouter } from "./routes/index.js";

export const app: Express = express();

app.use(cors({ credentials: true, origin: env.WEB_ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(requestContext);
app.use("/api", apiRouter);
app.use(notFound);
app.use(errorHandler);
