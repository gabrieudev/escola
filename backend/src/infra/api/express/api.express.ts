import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import errorHandler from "./middlewares/error-handler.middleware";
import "express-async-errors";
import "dotenv/config";
import "reflect-metadata";

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
        this.app.use(errorHandler);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });

        console.log(routes);
    }
}
