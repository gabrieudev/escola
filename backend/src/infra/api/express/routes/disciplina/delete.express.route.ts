import { Request, Response } from "express";
import {
    FindDisciplinaByIdInputDto,
    DeleteDisciplinaUsecase,
} from "../../../../../usecases/disciplina/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteDisciplinaService: DeleteDisciplinaUsecase
    ) {}

    public static create(
        deleteDisciplinaService: DeleteDisciplinaUsecase
    ): DeleteDisciplinaRoute {
        return new DeleteDisciplinaRoute(
            "/disciplinas/:idDisciplina",
            HttpMethod.DELETE,
            deleteDisciplinaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idDisciplina } = request.params;

            const input: FindDisciplinaByIdInputDto = {
                idDisciplina: parseInt(idDisciplina),
            };

            const output = await this.deleteDisciplinaService.execute(input);

            response.status(204).json(this.present(output));
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
