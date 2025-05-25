import { Request, Response } from "express";
import {
    UpdateDisciplinaInputDto,
    UpdateDisciplinaUsecase,
} from "../../../../../usecases/disciplina/update.usecase";
import { HttpMethod, Route } from "../route";
import { updateDisciplinaSchema } from "../../schemas/disciplina/disciplina.schema";
import { CursoProps } from "../../../../../domain/curso/entity/curso";
import { TipoDisciplinaProps } from "../../../../../domain/tipo_disciplina/entity/tipo-disciplina";

export type UpdateDisciplinaResponseDto = {
    idDisciplina: number;
    curso: CursoProps;
    tipoDisciplina: TipoDisciplinaProps;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class UpdateDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateDisciplinaService: UpdateDisciplinaUsecase
    ) {}

    public static create(
        updateDisciplinaService: UpdateDisciplinaUsecase
    ): UpdateDisciplinaRoute {
        return new UpdateDisciplinaRoute(
            "/cursos/:idCurso/disciplinas",
            HttpMethod.PUT,
            updateDisciplinaService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            updateDisciplinaSchema.parse(request.body);

            const {
                idDisciplina,
                sigla,
                descricao,
                periodo,
                cargaHoraria,
            }: UpdateDisciplinaInputDto = request.body;

            const input: UpdateDisciplinaInputDto = {
                idDisciplina,
                sigla,
                descricao,
                periodo,
                cargaHoraria,
            };

            const output = await this.updateDisciplinaService.execute(input);

            response.status(200).json(this.present(output));
        };
    }

    private present(
        output: UpdateDisciplinaResponseDto
    ): UpdateDisciplinaResponseDto {
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
