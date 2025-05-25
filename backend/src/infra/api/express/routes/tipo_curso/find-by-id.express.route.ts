import { Request, Response } from "express";
import {
    FindByIdTipoCursoInputDto,
    FindByIdTipoCursoUsecase,
} from "../../../../../usecases/tipo_curso/find-by-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindByIdTipoCursoResponseDto = {
    idTipoCurso: number;
    descricao: string;
};

export class FindByIdTipoCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findByIdService: FindByIdTipoCursoUsecase
    ) {}

    public static create(
        findByIdService: FindByIdTipoCursoUsecase
    ): FindByIdTipoCursoRoute {
        return new FindByIdTipoCursoRoute(
            "/tipos-curso/:id",
            HttpMethod.GET,
            findByIdService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const input: FindByIdTipoCursoInputDto = {
                idTipoCurso: parseInt(id),
            };

            const output: FindByIdTipoCursoResponseDto =
                await this.findByIdService.execute(input);

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
        output: FindByIdTipoCursoResponseDto
    ): FindByIdTipoCursoResponseDto {
        return {
            idTipoCurso: output.idTipoCurso,
            descricao: output.descricao,
        };
    }
}
