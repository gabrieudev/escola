import { TipoDisciplina } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import { TipoDisciplinaGateway } from "../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdTipoDisciplinaInputDto = {
    idTipoDisciplina: number;
};

export type FindByIdTipoDisciplinaOutputDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export class FindByIdTipoDisciplinaUsecase
    implements
        Usecase<
            FindByIdTipoDisciplinaInputDto,
            FindByIdTipoDisciplinaOutputDto
        >
{
    constructor(private gateway: TipoDisciplinaGateway) {}

    async execute(
        input: FindByIdTipoDisciplinaInputDto
    ): Promise<FindByIdTipoDisciplinaOutputDto> {
        const disciplina = await this.gateway.findById(input.idTipoDisciplina);

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        return this.presentOutput(disciplina);
    }

    private presentOutput(
        disciplina: TipoDisciplina
    ): FindByIdTipoDisciplinaOutputDto {
        return {
            idTipoDisciplina: disciplina.idTipoDisciplina!,
            descricao: disciplina.descricao,
        };
    }
}
