import { Request, Response } from "express";
import {
    FindByIdAlunoInputDto,
    FindByIdAlunoUsecase,
} from "../../../../../usecases/aluno/find-by-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindByIdAlunoResponseDto = {
    idAluno: number | null;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class FindByIdAlunoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findByIdAlunoService: FindByIdAlunoUsecase
    ) {}

    public static create(
        findByIdAlunoService: FindByIdAlunoUsecase
    ): FindByIdAlunoRoute {
        return new FindByIdAlunoRoute(
            "/alunos/:idAluno",
            HttpMethod.GET,
            findByIdAlunoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idAluno } = request.params;

            const input: FindByIdAlunoInputDto = {
                idAluno: parseInt(idAluno),
            };

            const output: FindByIdAlunoResponseDto =
                await this.findByIdAlunoService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    present(output: FindByIdAlunoResponseDto): FindByIdAlunoResponseDto {
        const response = {
            idAluno: output.idAluno,
            nome: output.nome,
            sexo: output.sexo,
            dtNascimento: output.dtNascimento,
        };

        return response;
    }
}
