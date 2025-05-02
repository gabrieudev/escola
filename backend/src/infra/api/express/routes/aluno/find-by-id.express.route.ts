import { Request, Response } from "express";
import {
    FindByIdAlunoInputDto,
    FindByIdAlunoUsecase,
} from "../../../../../usecases/aluno/find-by-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindByIdAlunoResponseDto = {
    id_aluno: number | null;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
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
            "/alunos/:id",
            HttpMethod.GET,
            findByIdAlunoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const input: FindByIdAlunoInputDto = {
                id_aluno: parseInt(id),
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
            id_aluno: output.id_aluno,
            tx_nome: output.tx_nome,
            tx_sexo: output.tx_sexo,
            dt_nascimento: output.dt_nascimento,
        };

        return response;
    }
}
