import { Request, Response } from "express";
import {
    FindDisciplinaByIdInputDto,
    FindByIdDisciplinaUseCase,
} from "../../../../../usecases/disciplina/find-by-id.usecase";
import { HttpMethod, Route } from "../route";
import { CursoProps } from "../../../../../domain/curso/entity/curso";
import { TipoDisciplinaProps } from "../../../../../domain/tipo_disciplina/entity/tipo-disciplina";

export type FindDisciplinaByIdResponseDto = {
    idDisciplina: number | null;
    curso: CursoProps;
    tipoDisciplina: TipoDisciplinaProps;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class FindByIdDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findDisciplinaByIdService: FindByIdDisciplinaUseCase
    ) {}

    public static create(findDisciplinaByIdService: FindByIdDisciplinaUseCase) {
        return new FindByIdDisciplinaRoute(
            "/disciplinas/:idDisciplina",
            HttpMethod.GET,
            findDisciplinaByIdService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idDisciplina } = request.params;

            const input: FindDisciplinaByIdInputDto = {
                idDisciplina: parseInt(idDisciplina),
            };

            const output: FindDisciplinaByIdResponseDto =
                await this.findDisciplinaByIdService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(
        output: FindDisciplinaByIdResponseDto
    ): FindDisciplinaByIdResponseDto {
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
