import { AlunoProps } from "../../domain/aluno/entity/aluno";
import { CursaGateway } from "../../domain/cursa/gateway/cursa.gateway";
import { DisciplinaProps } from "../../domain/disciplina/entity/disciplina";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdCursaInputDto = {
    idAluno: number;
    idDisciplina: number;
};

export type FindCursaByIdOutputDto = {
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

export class FindByIdCursaUsecase
    implements Usecase<FindByIdCursaInputDto, FindCursaByIdOutputDto>
{
    constructor(private cursaGateway: CursaGateway) {}

    static create(cursaGateway: CursaGateway) {
        return new FindByIdCursaUsecase(cursaGateway);
    }

    async execute(
        input: FindByIdCursaInputDto
    ): Promise<FindCursaByIdOutputDto> {
        const cursa = await this.cursaGateway.findById(
            input.idAluno,
            input.idDisciplina
        );

        if (!cursa) {
            throw new AppError("Matrícula não encontrada", 404);
        }

        return this.presentOutput(cursa);
    }

    private presentOutput(
        cursa: FindCursaByIdOutputDto
    ): FindCursaByIdOutputDto {
        return {
            aluno: cursa.aluno,
            disciplina: cursa.disciplina,
            ano: cursa.ano,
            semestre: cursa.semestre,
            faltas: cursa.faltas,
            nota1: cursa.nota1,
            nota2: cursa.nota2,
            nota3: cursa.nota3,
            isAprovado: cursa.isAprovado,
        };
    }
}
