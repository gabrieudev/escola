import { Request, Response } from "express";
import {
    DeleteTipoCursoInputDto,
    DeleteTipoCursoUsecase,
} from "../../../../../usecases/tipo_curso/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteTipoCursoRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteTipoCursoService: DeleteTipoCursoUsecase
    ) {}

    public static create(
        deleteTipoCursoService: DeleteTipoCursoUsecase
    ): DeleteTipoCursoRoute {
        return new DeleteTipoCursoRoute(
            "/tipos-curso/:id",
            "delete",
            deleteTipoCursoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const input: DeleteTipoCursoInputDto = {
                idTipoCurso: parseInt(id),
            };

            const output = await this.deleteTipoCursoService.execute(input);

            const responseBody = this.present(output);

            response.status(204).send(responseBody);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public present(output: any): any {
        return output;
    }
}
