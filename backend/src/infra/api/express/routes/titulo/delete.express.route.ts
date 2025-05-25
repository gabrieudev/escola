import { Request, Response } from "express";
import {
    DeleteTituloInputDto,
    DeleteTituloUsecase,
} from "../../../../../usecases/titulo/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteTituloRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteTituloService: DeleteTituloUsecase
    ) {}

    public static create(
        deleteTituloService: DeleteTituloUsecase
    ): DeleteTituloRoute {
        return new DeleteTituloRoute(
            "/titulo",
            HttpMethod.DELETE,
            deleteTituloService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idTitulo }: DeleteTituloInputDto = request.body;

            const input: DeleteTituloInputDto = {
                idTitulo,
            };

            const output = await this.deleteTituloService.execute(input);

            response.status(204).send(this.present(output));
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(output: any): any {
        return output;
    }
}
