import { AlunoProps } from "../../domain/aluno/entity/aluno";
import { CursaGateway } from "../../domain/cursa/gateway/cursa.gateway";
import { DisciplinaProps } from "../../domain/disciplina/entity/disciplina";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

type FindCursaByIdInputDto = {
    idAluno: number;
    idDisciplina: number;
};

type FindCursaByIdOutputDto = {
    aluno: AlunoProps;
    disciplina: DisciplinaProps;
    ano: number;
    semestre: number;
    faltas: number;
    nota1: number | null;
    nota2: number | null;
    nota3: number | null;
};

export class FindCursaByIdUsecase
    implements Usecase<FindCursaByIdInputDto, FindCursaByIdOutputDto>
{
    constructor(private cursaGateway: CursaGateway) {}

    async execute(
        input: FindCursaByIdInputDto
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
        };
    }
}
