import { Request, Response } from "express";
import {
    UpdateTipoCursoInputDto,
    UpdateTipoCursoUsecase,
} from "../../../../../usecases/tipo_curso/update.usecase";
import { HttpMethod, Route } from "../route";
import { updateTipoCursoSchema } from "../../schemas/tipo_curso/tipo-curso.schema";

export type UpdateTipoCursoResponseDto = {
    idTipoCurso: number;
    descricao: string;
};

export class UpdateTipoCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTipoCursoService: UpdateTipoCursoUsecase
    ) {}

    public static create(
        updateTipoCursoService: UpdateTipoCursoUsecase
    ): UpdateTipoCursoRoute {
        return new UpdateTipoCursoRoute(
            "/tipos-curso",
            HttpMethod.PUT,
            updateTipoCursoService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            updateTipoCursoSchema.parse(request.body);

            const { idTipoCurso, descricao }: UpdateTipoCursoInputDto =
                request.body;

            const input: UpdateTipoCursoInputDto = {
                idTipoCurso,
                descricao,
            };

            const output: UpdateTipoCursoResponseDto =
                await this.updateTipoCursoService.execute(input);

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

    private present(output: UpdateTipoCursoResponseDto) {
        return {
            idTipoCurso: output.idTipoCurso,
            descricao: output.descricao,
        };
    }
}
