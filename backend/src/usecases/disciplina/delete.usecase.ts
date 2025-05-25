import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindDisciplinaByIdInputDto = {
    idDisciplina: number;
};

export type FindDisciplinaByIdOutputDto = {
    data: null;
};

export class DeleteDisciplinaUsecase
    implements Usecase<FindDisciplinaByIdInputDto, FindDisciplinaByIdOutputDto>
{
    constructor(private disciplinaGateway: DisciplinaGateway) {}

    static create(disciplinaGateway: DisciplinaGateway) {
        return new DeleteDisciplinaUsecase(disciplinaGateway);
    }

    async execute(
        input: FindDisciplinaByIdInputDto
    ): Promise<FindDisciplinaByIdOutputDto> {
        const disciplina = await this.disciplinaGateway.findById(
            input.idDisciplina
        );

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        const result = await this.disciplinaGateway.delete(input.idDisciplina);

        if (!result) {
            throw new AppError("Erro ao deletar disciplina", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): FindDisciplinaByIdOutputDto {
        return {
            data: null,
        };
    }
}
