import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.middleware";
import actuator from "express-actuator";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../../docs/swagger/swagger.json";
import "express-async-errors";
import "dotenv/config";
import "reflect-metadata";
import AppError from "../../../utils/app-error";

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());

        const allowedOrigins = [
            "https://escola-rkhq.onrender.com",
            "http://localhost:3000",
        ];

        const corsOptions = {
            origin: (origin: any, callback: any) => {
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new AppError("Acesso bloqueado pelo CORS", 403));
                }
            },
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
            optionsSuccessStatus: 200,
        };

        this.app.use(cors(corsOptions));

        this.app.use(
            actuator({
                basePath: "/actuator",
            })
        );

        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );

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
