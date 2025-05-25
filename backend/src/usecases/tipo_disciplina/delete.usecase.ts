import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { TipoDisciplinaGateway } from "../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteTipoDisciplinaInputDto = {
    idTipoDisciplina: number;
};

export type DeleteTipoDisciplinaOutputDto = {
    data: null;
};

export class DeleteTipoDisciplinaUsecase
    implements
        Usecase<DeleteTipoDisciplinaInputDto, DeleteTipoDisciplinaOutputDto>
{
    constructor(
        private readonly tipoDisciplinaGateway: TipoDisciplinaGateway,
        private readonly disciplinaGateway: DisciplinaGateway
    ) {}

    static create(
        tipoDisciplinaGateway: TipoDisciplinaGateway,
        disciplinaGateway: DisciplinaGateway
    ) {
        return new DeleteTipoDisciplinaUsecase(
            tipoDisciplinaGateway,
            disciplinaGateway
        );
    }

    async execute(
        input: DeleteTipoDisciplinaInputDto
    ): Promise<DeleteTipoDisciplinaOutputDto> {
        const disciplina = await this.tipoDisciplinaGateway.findById(
            input.idTipoDisciplina
        );

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        if (
            await this.disciplinaGateway.existsByIdTipoDisciplina(
                input.idTipoDisciplina
            )
        ) {
            throw new AppError(
                "Tipo de disciplina possui disciplinas cadastradas",
                409
            );
        }

        await this.tipoDisciplinaGateway.delete(input.idTipoDisciplina);

        return this.presentOutput();
    }

    private presentOutput(): DeleteTipoDisciplinaOutputDto {
        return {
            data: null,
        };
    }
}
