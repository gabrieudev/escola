import { Request, Response } from "express";
import {
    CreateDisciplinaInputDto,
    CreateDisciplinaUsecase,
} from "../../../../../usecases/disciplina/create.usecase";
import { HttpMethod, Route } from "../route";
import { createDisciplinaSchema } from "../../schemas/disciplina/disciplina.schema";
import { CursoProps } from "../../../../../domain/curso/entity/curso";
import { TipoDisciplinaProps } from "../../../../../domain/tipo_disciplina/entity/tipo-disciplina";

export type CreateDisciplinaResponseDto = {
    idDisciplina: number | null;
    curso: CursoProps;
    tipoDisciplina: TipoDisciplinaProps;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class CreateDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createDisciplinaService: CreateDisciplinaUsecase
    ) {}

    public static create(createDisciplinaService: CreateDisciplinaUsecase) {
        return new CreateDisciplinaRoute(
            "/cursos/:idCurso/disciplinas",
            HttpMethod.POST,
            createDisciplinaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request, response) => {
            createDisciplinaSchema.parse(request.body);

            const { idCurso } = request.params;
            const {
                idTipoDisciplina,
                sigla,
                descricao,
                periodo,
                cargaHoraria,
            }: CreateDisciplinaInputDto = request.body;

            const input: CreateDisciplinaInputDto = {
                idCurso: parseInt(idCurso),
                idTipoDisciplina,
                sigla,
                descricao,
                periodo,
                cargaHoraria,
            };

            const output = await this.createDisciplinaService.execute(input);

            response.status(201).json(this.present(output));
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(
        output: CreateDisciplinaResponseDto
    ): CreateDisciplinaResponseDto {
        const response = {
            idDisciplina: output.idDisciplina,
            curso: output.curso,
            tipoDisciplina: output.tipoDisciplina,
            sigla: output.sigla,
            descricao: output.descricao,
            periodo: output.periodo,
            cargaHoraria: output.cargaHoraria,
        };

        return response;
    }
}
