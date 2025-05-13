import { CursaGateway } from "../../domain/cursa/gateway/cursa.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteCursaInputDto = {
    idAluno: number;
    idDisciplina: number;
};

export type DeleteCursaOutputDto = {
    data: null;
};

export class DeleteCursaUsecase
    implements Usecase<DeleteCursaInputDto, DeleteCursaOutputDto>
{
    constructor(private cursaGateway: CursaGateway) {}

    async execute(input: DeleteCursaInputDto): Promise<DeleteCursaOutputDto> {
        if (
            !(await this.cursaGateway.existsByIdAlunoAndIdDisciplina(
                input.idAluno,
                input.idDisciplina
            ))
        ) {
            throw new AppError("Matrícula não encontrada", 404);
        }

        const result = await this.cursaGateway.delete(
            input.idAluno!,
            input.idDisciplina!
        );

        if (!result) {
            throw new AppError("Erro ao deletar matrícula", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): DeleteCursaOutputDto {
        return {
            data: null,
        };
    }
}
