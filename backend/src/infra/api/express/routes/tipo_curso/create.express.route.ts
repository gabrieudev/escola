import { Request, Response } from "express";
import {
    CreateTipoCursoInputDto,
    CreateTipoCursoUsecase,
} from "../../../../../usecases/tipo_curso/create.usecase";
import { HttpMethod, Route } from "../route";
import { createTipoCursoSchema } from "../../schemas/tipo_curso/tipo-curso.schema";

export type CreateTipoCursoResponseDto = {
    idTipoCurso: number;
    descricao: string;
};

export class CreateTipoCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTipoCursoService: CreateTipoCursoUsecase
    ) {}

    public static create(
        createTipoCursoService: CreateTipoCursoUsecase
    ): CreateTipoCursoRoute {
        return new CreateTipoCursoRoute(
            "/tipos-curso",
            HttpMethod.POST,
            createTipoCursoService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            createTipoCursoSchema.parse(request.body);

            const { descricao }: CreateTipoCursoInputDto = request.body;

            const input: CreateTipoCursoInputDto = {
                descricao,
            };

            const output: CreateTipoCursoResponseDto =
                await this.createTipoCursoService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(
        output: CreateTipoCursoResponseDto
    ): CreateTipoCursoResponseDto {
        return {
            idTipoCurso: output.idTipoCurso,
            descricao: output.descricao,
        };
    }
}
