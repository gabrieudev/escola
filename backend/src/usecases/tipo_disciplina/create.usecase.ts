import { TipoDisciplina } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import { TipoDisciplinaGateway } from "../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateTipoDisciplinaInputDto = {
    descricao: string;
};

export type CreateTipoDisciplinaOutputDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export class CreateTipoDisciplinaUsecase
    implements
        Usecase<CreateTipoDisciplinaInputDto, CreateTipoDisciplinaOutputDto>
{
    constructor(private gateway: TipoDisciplinaGateway) {}

    static create(gateway: TipoDisciplinaGateway): CreateTipoDisciplinaUsecase {
        return new CreateTipoDisciplinaUsecase(gateway);
    }

    async execute(
        input: CreateTipoDisciplinaInputDto
    ): Promise<CreateTipoDisciplinaOutputDto> {
        if (await this.gateway.existsByDescricao(input.descricao)) {
            throw new AppError("Tipo de disciplina já cadastrado", 409);
        }

        const disciplina = TipoDisciplina.create(null, input.descricao);

        const result = await this.gateway.create(disciplina);

        if (!result) {
            throw new AppError("Erro ao cadastrar tipo de disciplina", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(
        disciplina: TipoDisciplina
    ): CreateTipoDisciplinaOutputDto {
        return {
            idTipoDisciplina: disciplina.idTipoDisciplina!,
            descricao: disciplina.descricao,
        };
    }
}
