// src/middlewares/logger.ts
import morgan from "morgan";
import { Request, Response } from "express";

export const logger = morgan((tokens:any, req: Request, res: Response) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});
