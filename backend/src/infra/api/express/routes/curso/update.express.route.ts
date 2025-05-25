import { Request, Response } from "express";
import {
    UpdateCursoInputDto,
    UpdateCursoUsecase,
} from "../../../../../usecases/curso/update.usecase";
import { HttpMethod, Route } from "../route";
import { updateCursoSchema } from "../../schemas/curso/curso.schema";
import { InstituicaoProps } from "../../../../../domain/instituicao/entity/instituicao";
import { TipoCursoProps } from "../../../../../domain/tipo_curso/entity/tipo-curso";

export type UpdateCursoResponseDto = {
    idCurso: number;
    descricao: string;
    instituicao: InstituicaoProps;
    tipoCurso: TipoCursoProps;
};

export class UpdateCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateCursoService: UpdateCursoUsecase
    ) {}

    public static create(
        updateCursoService: UpdateCursoUsecase
    ): UpdateCursoRoute {
        return new UpdateCursoRoute(
            "/instituicoes/:idInstituicao/cursos",
            HttpMethod.PUT,
            updateCursoService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            updateCursoSchema.parse(request.body);

            const { idCurso, descricao }: UpdateCursoInputDto = request.body;

            const input: UpdateCursoInputDto = {
                idCurso,
                descricao,
            };

            const output: UpdateCursoResponseDto =
                await this.updateCursoService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath() {
        return this.path;
    }

    public getMethod() {
        return this.method;
    }

    private present(output: UpdateCursoResponseDto) {
        return {
            idCurso: output.idCurso,
            descricao: output.descricao,
            instituicao: output.instituicao,
            tipoCurso: output.tipoCurso,
        };
    }
}
