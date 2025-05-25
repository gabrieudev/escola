import { Request, Response } from "express";
import { AlunoProps } from "../../../../../domain/aluno/entity/aluno";
import { DisciplinaProps } from "../../../../../domain/disciplina/entity/disciplina";
import {
    FindByIdCursaInputDto,
    FindByIdCursaUsecase,
} from "../../../../../usecases/cursa/find-by-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindByIdCursaResponseDto = {
    aluno: AlunoProps;
    disciplina: DisciplinaProps;
    ano: number;
    semestre: number;
    faltas: number;
    nota1: number | null;
    nota2: number | null;
    nota3: number | null;
    isAprovado: boolean;
};

export class FindByIdCursaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findCursaByIdService: FindByIdCursaUsecase
    ) {}

    public static create(
        findCursaByIdService: FindByIdCursaUsecase
    ): FindByIdCursaRoute {
        return new FindByIdCursaRoute(
            "/alunos/:idAluno/matriculas/:idDisciplina",
            HttpMethod.GET,
            findCursaByIdService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idAluno, idDisciplina } = request.params;

            const input: FindByIdCursaInputDto = {
                idAluno: parseInt(idAluno),
                idDisciplina: parseInt(idDisciplina),
            };

            const output: FindByIdCursaResponseDto =
                await this.findCursaByIdService.execute(input);

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

    public present(output: FindByIdCursaResponseDto): FindByIdCursaResponseDto {
        const response = {
            aluno: output.aluno,
            disciplina: output.disciplina,
            ano: output.ano,
            semestre: output.semestre,
            faltas: output.faltas,
            nota1: output.nota1,
            nota2: output.nota2,
            nota3: output.nota3,
            isAprovado: output.isAprovado,
        };

        return response;
    }
}
