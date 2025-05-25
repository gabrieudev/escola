import { Request, Response } from "express";
import {
    FindAllTipoCursoInputDto,
    FindAllTipoCursoUsecase,
} from "../../../../../usecases/tipo_curso/find-all.usecase";
import { HttpMethod, Route } from "../route";
import { TipoCursoProps } from "../../../../../domain/tipo_curso/entity/tipo-curso";

export type FindAllTipoCursoResponseDto = {
    tiposCurso: TipoCursoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllTipoCursoRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllTipoCursoUsecase: FindAllTipoCursoUsecase
    ) {}

    public static create(
        findAllTipoCursoUsecase: FindAllTipoCursoUsecase
    ): FindAllTipoCursoRoute {
        return new FindAllTipoCursoRoute(
            "/tipos-curso",
            HttpMethod.GET,
            findAllTipoCursoUsecase
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { descricao, page, limit } = request.query as {
                [key: string]: string | null;
            };

            const input: FindAllTipoCursoInputDto = {
                descricao: descricao ?? null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllTipoCursoResponseDto =
                await this.findAllTipoCursoUsecase.execute(input);

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

    public present(
        output: FindAllTipoCursoResponseDto
    ): FindAllTipoCursoResponseDto {
        const response = {
            tiposCurso: output.tiposCurso,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };

        return response;
    }
}
