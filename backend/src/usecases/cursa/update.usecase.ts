import { AlunoProps } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import { Cursa } from "../../domain/cursa/entity/cursa";
import { CursaGateway } from "../../domain/cursa/gateway/cursa.gateway";
import { DisciplinaProps } from "../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateCursaInputDto = {
    idAluno: number;
    idDisciplina: number;
    ano: number;
    semestre: number;
    faltas: number;
    nota1: number | null;
    nota2: number | null;
    nota3: number | null;
    isAprovado: boolean;
};

export type UpdateCursaOutputDto = {
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

export class UpdateCursaUsecase
    implements Usecase<UpdateCursaInputDto, UpdateCursaOutputDto>
{
    constructor(
        private cursaGateway: CursaGateway,
        private alunoGateway: AlunoGateway,
        private disciplinaGateway: DisciplinaGateway
    ) {}

    static create(
        cursaGateway: CursaGateway,
        alunoGateway: AlunoGateway,
        disciplinaGateway: DisciplinaGateway
    ) {
        return new UpdateCursaUsecase(
            cursaGateway,
            alunoGateway,
            disciplinaGateway
        );
    }

    async execute(input: UpdateCursaInputDto): Promise<UpdateCursaOutputDto> {
        const aluno = await this.alunoGateway.findById(input.idAluno);
        if (!aluno) {
            throw new AppError("Aluno não encontrado", 404);
        }

        const disciplina = await this.disciplinaGateway.findById(
            input.idDisciplina
        );
        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        const cursa = Cursa.create(
            aluno,
            disciplina,
            input.ano,
            input.semestre,
            input.faltas,
            input.nota1,
            input.nota2,
            input.nota3,
            input.isAprovado
        );

        await this.cursaGateway.update(cursa);

        return this.presentOutput(cursa);
    }

    private presentOutput(cursa: Cursa): UpdateCursaOutputDto {
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
