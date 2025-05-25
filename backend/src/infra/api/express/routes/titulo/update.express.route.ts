import { Request, Response } from "express";
import {
    UpdateTituloInputDto,
    UpdateTituloUsecase,
} from "../../../../../usecases/titulo/update.usecase";
import { updateTituloSchema } from "../../schemas/titulo/titulo.schema";
import { HttpMethod, Route } from "../route";

export type UpdateTituloResponseDto = {
    idTitulo: number;
    descricao: string;
};

export class UpdateTituloRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTituloService: UpdateTituloUsecase
    ) {}

    public static create(
        updateTituloService: UpdateTituloUsecase
    ): UpdateTituloRoute {
        return new UpdateTituloRoute(
            "/titulos",
            HttpMethod.PUT,
            updateTituloService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            updateTituloSchema.parse(request.body);

            const { idTitulo, descricao }: UpdateTituloInputDto = request.body;

            const input: UpdateTituloInputDto = {
                idTitulo,
                descricao,
            };

            const output: UpdateTituloResponseDto =
                await this.updateTituloService.execute(input);

            response.status(200).json(this.present(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(output: UpdateTituloResponseDto): UpdateTituloResponseDto {
        return {
            idTitulo: output.idTitulo,
            descricao: output.descricao,
        };
    }
}
