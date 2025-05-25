import { Request, Response } from "express";
import { AlunoProps } from "../../../../../domain/aluno/entity/aluno";
import { DisciplinaProps } from "../../../../../domain/disciplina/entity/disciplina";
import {
    UpdateCursaInputDto,
    UpdateCursaUsecase,
} from "../../../../../usecases/cursa/update.usecase";
import { updateCursaSchema } from "../../schemas/cursa/cursa.schema";
import { HttpMethod, Route } from "../route";

export type UpdateCursaResponseDto = {
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

export class UpdateCursaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateCursaService: UpdateCursaUsecase
    ) {}

    public static create(updateCursaService: UpdateCursaUsecase) {
        return new UpdateCursaRoute(
            "/alunos/:idAluno/matriculas",
            HttpMethod.PUT,
            updateCursaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            updateCursaSchema.parse(request.body);

            const {
                idDisciplina,
                ano,
                semestre,
                faltas,
                nota1,
                nota2,
                nota3,
                isAprovado,
            }: UpdateCursaInputDto = request.body;
            const { idAluno } = request.params;

            const input: UpdateCursaInputDto = {
                idAluno: parseInt(idAluno),
                idDisciplina: idDisciplina,
                ano,
                semestre,
                faltas,
                nota1,
                nota2,
                nota3,
                isAprovado,
            };

            const output: UpdateCursaResponseDto =
                await this.updateCursaService.execute(input);

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

    private present(output: UpdateCursaResponseDto): UpdateCursaResponseDto {
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
