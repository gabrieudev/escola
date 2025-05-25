import { Request, Response } from "express";
import {
    DeleteProfessorInputDto,
    DeleteProfessorUsecase,
} from "../../../../../usecases/professor/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteProfessorRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteProfessorService: DeleteProfessorUsecase
    ) {}

    public static create(
        deleteProfessorService: DeleteProfessorUsecase
    ): DeleteProfessorRoute {
        return new DeleteProfessorRoute(
            "/professores/:idProfessor",
            HttpMethod.DELETE,
            deleteProfessorService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idProfessor } = request.params;

            const input: DeleteProfessorInputDto = {
                idProfessor: parseInt(idProfessor),
            };

            await this.deleteProfessorService.execute(input);

            response.status(204).send();
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
