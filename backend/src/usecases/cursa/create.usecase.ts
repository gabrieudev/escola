import { AlunoProps } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import { Cursa } from "../../domain/cursa/entity/cursa";
import { CursaGateway } from "../../domain/cursa/gateway/cursa.gateway";
import { DisciplinaProps } from "../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateCursaInputDto = {
    aluno: AlunoProps;
    disciplina: DisciplinaProps;
    ano: number;
    semestre: number;
    faltas: number;
};

export type CreateCursaOutputDto = {
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

export class CreateCursaUsecase
    implements Usecase<CreateCursaInputDto, CreateCursaOutputDto>
{
    constructor(
        private readonly cursaGateway: CursaGateway,
        private readonly alunoGateway: AlunoGateway,
        private readonly disciplinaGateway: DisciplinaGateway
    ) {}

    public async create(
        cursaGateway: CursaGateway,
        alunoGateway: AlunoGateway,
        disciplinaGateway: DisciplinaGateway
    ) {
        return new CreateCursaUsecase(
            cursaGateway,
            alunoGateway,
            disciplinaGateway
        );
    }

    async execute(input: CreateCursaInputDto): Promise<CreateCursaOutputDto> {
        const aluno = await this.alunoGateway.findById(input.aluno.idAluno!);
        const disciplina = await this.disciplinaGateway.findById(
            input.disciplina.idDisciplina!
        );

        if (!aluno) {
            throw new AppError("Aluno não encontrado", 404);
        }

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        if (
            await this.cursaGateway.existsByIdAlunoAndIdDisciplina(
                aluno.idAluno!,
                disciplina.idDisciplina!
            )
        ) {
            throw new AppError("Matrícula já cadastrada", 409);
        }

        const cursa = Cursa.create(
            aluno,
            disciplina,
            input.ano,
            input.semestre,
            input.faltas
        );

        const result = await this.cursaGateway.create(cursa);

        if (!result) {
            throw new AppError("Erro ao cadastrar cursa", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(cursa: Cursa): CreateCursaOutputDto {
        return {
            aluno: cursa.aluno,
            disciplina: cursa.disciplina,
            ano: cursa.ano,
            semestre: cursa.semestre,
            nota1: cursa.nota1,
            nota2: cursa.nota2,
            nota3: cursa.nota3,
            faltas: cursa.faltas,
            isAprovado: cursa.isAprovado,
        };
    }
}
