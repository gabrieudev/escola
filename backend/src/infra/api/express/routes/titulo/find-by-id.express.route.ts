import { Request, Response } from "express";
import {
    FindTituloByIdInputDto,
    FindByIdTituloUsecase,
} from "../../../../../usecases/titulo/find-by-id.usecase";
import { createTituloSchema } from "../../schemas/titulo/titulo.schema";
import { HttpMethod, Route } from "../route";

export type FindByIdTituloResponseDto = {
    idTitulo: number;
    descricao: string;
};

export class FindByIdTituloRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findTituloByIdService: FindByIdTituloUsecase
    ) {}

    public static create(
        findTituloByIdService: FindByIdTituloUsecase
    ): FindByIdTituloRoute {
        return new FindByIdTituloRoute(
            "/titulo",
            HttpMethod.GET,
            findTituloByIdService
        );
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            createTituloSchema.parse(request.params);

            const { idTitulo } = request.params;

            const input: FindTituloByIdInputDto = {
                idTitulo: parseInt(idTitulo),
            };

            const output: FindByIdTituloResponseDto =
                await this.findTituloByIdService.execute(input);

            response.status(200).json(this.present(output));
        };
    }

    private present(
        output: FindByIdTituloResponseDto
    ): FindByIdTituloResponseDto {
        return {
            idTitulo: output.idTitulo,
            descricao: output.descricao,
        };
    }
}
