import { Request, Response } from "express";
import {
    FindAllTituloInputDto,
    FindAllTituloUsecase,
} from "../../../../../usecases/titulo/find-all.usecase";
import { HttpMethod, Route } from "../route";
import { TituloProps } from "../../../../../domain/titulo/entity/titulo";

export type FindAllTituloResponseDto = {
    titulos: TituloProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllTituloRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllTituloService: FindAllTituloUsecase
    ) {}

    public static create(
        findAllTituloService: FindAllTituloUsecase
    ): FindAllTituloRoute {
        return new FindAllTituloRoute(
            "/titulos",
            HttpMethod.GET,
            findAllTituloService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { descricao, page, limit } = request.query as {
                [key: string]: string | null;
            };

            const input: FindAllTituloInputDto = {
                descricao: descricao ?? null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllTituloResponseDto =
                await this.findAllTituloService.execute(input);

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
        output: FindAllTituloResponseDto
    ): FindAllTituloResponseDto {
        return {
            titulos: output.titulos,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };
    }
}
