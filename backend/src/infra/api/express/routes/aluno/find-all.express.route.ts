import { Request, Response } from "express";
import { AlunoProps } from "../../../../../domain/aluno/entity/aluno";
import {
    FindAllAlunoInputDto,
    FindAllAlunoUsecase,
} from "../../../../../usecases/aluno/find-all.usecase";
import { HttpMethod, Route } from "../route";

export type FindAllAlunoResponseDto = {
    alunos: AlunoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllAlunoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllAlunoService: FindAllAlunoUsecase
    ) {}

    public static create(
        findAllAlunoService: FindAllAlunoUsecase
    ): FindAllAlunoRoute {
        return new FindAllAlunoRoute(
            "/alunos",
            HttpMethod.GET,
            findAllAlunoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { nome, page, limit } = request.query as {
                [key: string]: string | null;
            };

            const input: FindAllAlunoInputDto = {
                nome: nome ?? null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllAlunoResponseDto =
                await this.findAllAlunoService.execute(input);

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

    private present(output: FindAllAlunoResponseDto): FindAllAlunoResponseDto {
        const response = {
            alunos: output.alunos,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };

        return response;
    }
}
