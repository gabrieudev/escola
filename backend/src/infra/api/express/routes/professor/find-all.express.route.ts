import { Request, Response } from "express";
import {
    FindAllProfessorInputDto,
    FindAllProfessorUsecase,
} from "../../../../../usecases/professor/find-all.usecase";
import { HttpMethod, Route } from "../route";
import { ProfessorProps } from "../../../../../domain/professor/entity/professor";

export type FindAllProfessorResponseDto = {
    professores: ProfessorProps[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllProfessorRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllProfessorService: FindAllProfessorUsecase
    ) {}

    public static create(
        findAllProfessorService: FindAllProfessorUsecase
    ): FindAllProfessorRoute {
        return new FindAllProfessorRoute(
            "/professores",
            HttpMethod.GET,
            findAllProfessorService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { nome, idTitulo, page, limit } = request.query as {
                [key: string]: string | null;
            };

            const input: FindAllProfessorInputDto = {
                nome: nome ?? null,
                idTitulo: idTitulo ? parseInt(idTitulo) : null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllProfessorResponseDto =
                await this.findAllProfessorService.execute(input);

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

    private present(
        output: FindAllProfessorResponseDto
    ): FindAllProfessorResponseDto {
        return {
            professores: output.professores,
            page: output.page,
            limit: output.limit,
            total: output.total,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };
    }
}
