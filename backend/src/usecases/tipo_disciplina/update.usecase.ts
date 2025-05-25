import { TipoDisciplina } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import { TipoDisciplinaGateway } from "../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateTipoDisciplinaInputDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export type UpdateTipoDisciplinaOutputDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export class UpdateTipoDisciplinaUsecase
    implements
        Usecase<UpdateTipoDisciplinaInputDto, UpdateTipoDisciplinaOutputDto>
{
    constructor(private gateway: TipoDisciplinaGateway) {}

    static create(gateway: TipoDisciplinaGateway): UpdateTipoDisciplinaUsecase {
        return new UpdateTipoDisciplinaUsecase(gateway);
    }

    async execute(
        input: UpdateTipoDisciplinaInputDto
    ): Promise<UpdateTipoDisciplinaOutputDto> {
        const disciplina = await this.gateway.findById(input.idTipoDisciplina);

        if (!disciplina) {
            throw new AppError("Tipo de disciplina não encontrada", 404);
        }

        if (
            (await this.gateway.existsByDescricao(input.descricao)) &&
            input.descricao !== disciplina.descricao
        ) {
            throw new AppError("Tipo de disciplina já cadastrado", 409);
        }

        disciplina.update(input.descricao);

        const result = await this.gateway.update(disciplina);

        if (!result) {
            throw new AppError("Erro ao atualizar tipo de disciplina", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(
        disciplina: TipoDisciplina
    ): UpdateTipoDisciplinaOutputDto {
        return {
            idTipoDisciplina: disciplina.idTipoDisciplina!,
            descricao: disciplina.descricao,
        };
    }
}
