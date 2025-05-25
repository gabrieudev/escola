import { Request, Response } from "express";
import {
    FindAllInstituicaoInputDto,
    FindAllInstituicaoUsecase,
} from "../../../../../usecases/instituicao/find-all.usecase";
import { HttpMethod, Route } from "../route";
import { InstituicaoProps } from "../../../../../domain/instituicao/entity/instituicao";

export type FindAllInstituicaoResponseDto = {
    instituicoes: InstituicaoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllInstituicaoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllInstituicaoService: FindAllInstituicaoUsecase
    ) {}

    static create(
        findAllInstituicaoService: FindAllInstituicaoUsecase
    ): FindAllInstituicaoRoute {
        return new FindAllInstituicaoRoute(
            "/instituicoes",
            HttpMethod.GET,
            findAllInstituicaoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request, response) => {
            const { sigla, page, limit } = request.query as {
                [key: string]: string | null;
            };

            const input: FindAllInstituicaoInputDto = {
                sigla: sigla ?? null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllInstituicaoResponseDto =
                await this.findAllInstituicaoService.execute(input);

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
        output: FindAllInstituicaoResponseDto
    ): FindAllInstituicaoResponseDto {
        const response = {
            instituicoes: output.instituicoes,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };

        return response;
    }
}
