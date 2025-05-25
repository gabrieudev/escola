import { Request, Response } from "express";
import {
    CreateTituloInputDto,
    CreateTituloUsecase,
} from "../../../../../usecases/titulo/create.usecase";
import { createTituloSchema } from "../../schemas/titulo/titulo.schema";
import { HttpMethod, Route } from "../route";

export type CreateTituloResponseDto = {
    idTitulo: number;
    descricao: string;
};

export class CreateTituloRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTituloService: CreateTituloUsecase
    ) {}

    public static create(
        createTituloService: CreateTituloUsecase
    ): CreateTituloRoute {
        return new CreateTituloRoute(
            "/titulos",
            HttpMethod.POST,
            createTituloService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            createTituloSchema.parse(request.body);

            const { descricao }: CreateTituloInputDto = request.body;

            const input: CreateTituloInputDto = {
                descricao,
            };

            const output: CreateTituloResponseDto =
                await this.createTituloService.execute(input);

            response.status(201).json(this.present(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public present(output: CreateTituloResponseDto): CreateTituloResponseDto {
        return {
            idTitulo: output.idTitulo,
            descricao: output.descricao,
        };
    }
}
