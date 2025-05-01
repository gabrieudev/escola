import { NextFunction, Request, Response } from "express";
import AppError from "../../../../utils/app-error";
import { ZodError } from "zod";

export default (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            ...(isDevelopment && { stack: err.stack }),
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 400,
            message: "Erro de validação",
            details: err.errors.map((e) => ({
                path: e.path,
                message: e.message,
            })),
        });
    }

    res.status(500).json({
        status: "error",
        message: "Erro interno no servidor",
        ...(isDevelopment && { stack: err.stack }),
    });
};
