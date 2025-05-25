import { Request, Response } from "express";
import {
    FindAllDisciplinaInputDto,
    FindAllDisciplinaUsecase,
} from "../../../../../usecases/disciplina/find-all.usecase";
import { HttpMethod, Route } from "../route";
import { DisciplinaProps } from "../../../../../domain/disciplina/entity/disciplina";

export type FindAllDisciplinaResponseDto = {
    disciplinas: DisciplinaProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllDisciplinaService: FindAllDisciplinaUsecase
    ) {}

    public static create(findAllDisciplinaService: FindAllDisciplinaUsecase) {
        return new FindAllDisciplinaRoute(
            "/cursos/:idCurso/disciplinas",
            HttpMethod.GET,
            findAllDisciplinaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idTipoDisciplina, sigla, descricao, periodo, page, limit } =
                request.query as {
                    [key: string]: string | null;
                };

            const { idCurso } = request.params as { [key: string]: string };

            const input: FindAllDisciplinaInputDto = {
                idCurso: parseInt(idCurso),
                idTipoDisciplina: idTipoDisciplina
                    ? parseInt(idTipoDisciplina)
                    : null,
                sigla: sigla ?? null,
                descricao: descricao ?? null,
                periodo: periodo ? parseInt(periodo) : null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllDisciplinaResponseDto =
                await this.findAllDisciplinaService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(
        output: FindAllDisciplinaResponseDto
    ): FindAllDisciplinaResponseDto {
        const response = {
            disciplinas: output.disciplinas,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };

        return response;
    }
}
