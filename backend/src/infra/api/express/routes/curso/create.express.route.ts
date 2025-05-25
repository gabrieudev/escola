import { Request, Response } from "express";
import {
    CreateCursoInputDto,
    CreateCursoUsecase,
} from "../../../../../usecases/curso/create.usecase";
import { HttpMethod, Route } from "../route";
import { createCursoSchema } from "../../schemas/curso/curso.schema";
import { InstituicaoProps } from "../../../../../domain/instituicao/entity/instituicao";
import { TipoCursoProps } from "../../../../../domain/tipo_curso/entity/tipo-curso";

export type CreateCursoResponseDto = {
    idCurso: number;
    descricao: string;
    instituicao: InstituicaoProps;
    tipoCurso: TipoCursoProps;
};

export class CreateCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createCursoService: CreateCursoUsecase
    ) {}

    public static create(
        createCursoService: CreateCursoUsecase
    ): CreateCursoRoute {
        return new CreateCursoRoute(
            "/instituicoes/:idInstituicao/cursos",
            HttpMethod.POST,
            createCursoService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            createCursoSchema.parse(request.body);

            const { descricao, idTipoCurso }: CreateCursoInputDto =
                request.body;

            const { idInstituicao } = request.params;

            const input: CreateCursoInputDto = {
                descricao,
                idInstituicao: parseInt(idInstituicao),
                idTipoCurso: idTipoCurso,
            };

            const output: CreateCursoResponseDto =
                await this.createCursoService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody).send();
        };
    }

    public getPath() {
        return this.path;
    }

    public getMethod() {
        return this.method;
    }

    private present(output: CreateCursoResponseDto) {
        return {
            idCurso: output.idCurso,
            descricao: output.descricao,
            instituicao: output.instituicao,
            tipoCurso: output.tipoCurso,
        };
    }
}
