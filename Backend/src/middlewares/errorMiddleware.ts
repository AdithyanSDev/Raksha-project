import { Request, Response, NextFunction } from "express";


interface CustomError extends Error {
  status?: number;
  message: string;
}

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error Middleware]`, err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, 
  });
};

export default errorMiddleware;
