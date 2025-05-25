import { Request, Response } from "express";
import {
    DeleteAlunoInputDto,
    DeleteAlunoUsecase,
} from "../../../../../usecases/aluno/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteAlunoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteAlunoService: DeleteAlunoUsecase
    ) {}

    static create(deleteAlunoService: DeleteAlunoUsecase): DeleteAlunoRoute {
        return new DeleteAlunoRoute(
            "/alunos/:idAluno",
            HttpMethod.DELETE,
            deleteAlunoService
        );
    }

    getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idAluno } = request.params;

            const input: DeleteAlunoInputDto = {
                idAluno: parseInt(idAluno),
            };

            const output = await this.deleteAlunoService.execute(input);

            const responseBody = this.present(output);

            response.status(204).send(responseBody);
        };
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    present(output: any): any {
        return output;
    }
}
