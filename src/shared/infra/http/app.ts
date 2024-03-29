import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import createConnection from "../database";

import "@shared/container";

import { router } from "./routes";

import { AppError } from "@shared/errors/AppError";
import swaggerFile from "../../../../swagger.json";

createConnection();
const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app }