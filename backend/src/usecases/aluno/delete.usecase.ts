import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteAlunoInputDto = {
    id_aluno: number;
};

export type DeleteAlunoOutputDto = {
    data: null;
};

export class DeleteAlunoUsecase
    implements Usecase<DeleteAlunoInputDto, DeleteAlunoOutputDto>
{
    constructor(private alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new DeleteAlunoUsecase(alunoGateway);
    }

    async execute({
        id_aluno,
    }: DeleteAlunoInputDto): Promise<DeleteAlunoOutputDto> {
        if (!(await this.alunoGateway.existsById(id_aluno))) {
            throw new AppError("Aluno não encontrado.", 404);
        }

        const result = await this.alunoGateway.delete(id_aluno);

        if (!result) {
            throw new AppError("Erro ao deletar aluno.", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): DeleteAlunoOutputDto {
        return {
            data: null,
        };
    }
}
