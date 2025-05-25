import { Professor } from "../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import { TituloProps } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteProfessorInputDto = {
    idProfessor: number;
};

export type DeleteProfessorOutputDto = {
    data: null;
};

export class DeleteProfessorUsecase
    implements Usecase<DeleteProfessorInputDto, DeleteProfessorOutputDto>
{
    constructor(private readonly professorGateway: ProfessorGateway) {}

    static create(professorGateway: ProfessorGateway) {
        return new DeleteProfessorUsecase(professorGateway);
    }

    async execute(
        input: DeleteProfessorInputDto
    ): Promise<DeleteProfessorOutputDto> {
        const professor = await this.professorGateway.findById(
            input.idProfessor
        );

        if (!professor) {
            throw new AppError("Professor não encontrado", 404);
        }

        const result = await this.professorGateway.delete(input.idProfessor);

        if (!result) {
            throw new AppError("Erro ao deletar professor", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): DeleteProfessorOutputDto {
        return {
            data: null,
        };
    }
}
