import { DisciplinaProps } from "../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { Leciona } from "../../domain/leciona/entity/leciona";
import { LecionaGateway } from "../../domain/leciona/gateway/leciona.gateway";
import { ProfessorProps } from "../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateLecionaInputDto = {
    disciplina: DisciplinaProps;
    professor: ProfessorProps;
};

export type CreateLecionaOutputDto = {
    disciplina: DisciplinaProps;
    professor: ProfessorProps;
};

export class CreateLecionaUsecase
    implements Usecase<CreateLecionaInputDto, CreateLecionaOutputDto>
{
    constructor(
        private readonly lecionaGateway: LecionaGateway,
        private readonly disciplinaGateway: DisciplinaGateway,
        private readonly professorGateway: ProfessorGateway
    ) {}

    async execute(
        input: CreateLecionaInputDto
    ): Promise<CreateLecionaOutputDto> {
        const disciplina = await this.disciplinaGateway.findById(
            input.disciplina.idDisciplina!
        );
        const professor = await this.professorGateway.findById(
            input.professor.idProfessor!
        );

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        if (!professor) {
            throw new AppError("Professor não encontrado", 404);
        }

        if (
            await this.lecionaGateway.existsByIdDisciplinaAndIdProfessor(
                disciplina.idDisciplina!,
                professor.idProfessor!
            )
        ) {
            throw new AppError("Leciona já cadastrada", 409);
        }

        const leciona = Leciona.create(disciplina, professor);

        const result = await this.lecionaGateway.create(leciona);

        if (!result) {
            throw new AppError("Erro ao cadastrar leciona", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(leciona: Leciona): CreateLecionaOutputDto {
        return {
            disciplina: leciona.disciplina,
            professor: leciona.professor,
        };
    }
}
