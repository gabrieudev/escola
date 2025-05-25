import { Request, Response } from "express";
import {
    DeleteCursaInputDto,
    DeleteCursaUsecase,
} from "../../../../../usecases/cursa/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteCursaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteCursaService: DeleteCursaUsecase
    ) {}

    public static create(
        deleteCursaService: DeleteCursaUsecase
    ): DeleteCursaRoute {
        return new DeleteCursaRoute(
            "/alunos/:idAluno/matriculas/:idDisciplina",
            HttpMethod.DELETE,
            deleteCursaService
        );
    }

    getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idAluno, idDisciplina } = request.params;

            const input: DeleteCursaInputDto = {
                idAluno: parseInt(idAluno),
                idDisciplina: parseInt(idDisciplina),
            };

            const output = await this.deleteCursaService.execute(input);

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

    private present(output: any): any {
        return output;
    }
}
