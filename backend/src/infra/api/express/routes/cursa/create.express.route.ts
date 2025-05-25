import { Request, Response } from "express";
import { AlunoProps } from "../../../../../domain/aluno/entity/aluno";
import { DisciplinaProps } from "../../../../../domain/disciplina/entity/disciplina";
import {
    CreateCursaInputDto,
    CreateCursaUsecase,
} from "../../../../../usecases/cursa/create.usecase";
import { createCursaSchema } from "../../schemas/cursa/cursa.schema";
import { HttpMethod, Route } from "../route";

export type CreateCursaResponseDto = {
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

export class CreateCursaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createCursaService: CreateCursaUsecase
    ) {}

    public static create(createCursaService: CreateCursaUsecase) {
        return new CreateCursaRoute(
            "alunos/:idAluno/matriculas",
            HttpMethod.POST,
            createCursaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            createCursaSchema.parse(request.body);

            const { idDisciplina, ano, semestre, faltas }: CreateCursaInputDto =
                request.body;
            const { idAluno } = request.params;

            const input: CreateCursaInputDto = {
                idAluno: parseInt(idAluno),
                idDisciplina: idDisciplina,
                ano,
                semestre,
                faltas,
            };

            const output: CreateCursaResponseDto =
                await this.createCursaService.execute(input);

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

    private present(output: CreateCursaResponseDto): CreateCursaResponseDto {
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
