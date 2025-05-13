import { TipoDisciplinaProps } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import { TipoDisciplinaGateway } from "../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

type UpdateTipoDisciplinaInputDto = {
    descricao: string | null;
    page: number | null;
    limit: number | null;
};

type UpdateTipoDisciplinaOutputDto = {
    tiposDisciplina: TipoDisciplinaProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllTipoDisciplinaUsecase
    implements
        Usecase<UpdateTipoDisciplinaInputDto, UpdateTipoDisciplinaOutputDto>
{
    constructor(private gateway: TipoDisciplinaGateway) {}

    async execute({
        descricao,
        page,
        limit,
    }: UpdateTipoDisciplinaInputDto): Promise<UpdateTipoDisciplinaOutputDto> {
        if (
            (page !== null && limit === null) ||
            (page === null && limit !== null)
        ) {
            throw new AppError(
                "Forneça ambos 'page' e 'limit', ou nenhum para desativar paginação.",
                400
            );
        }

        if (page !== null && limit !== null) {
            if (page < 1) throw new AppError("Parâmetro 'page' inválido.", 400);
            if (limit < 1)
                throw new AppError("Parâmetro 'limit' inválido.", 400);
        }

        const paginationActive = page !== null && limit !== null;

        const calculatedPage = paginationActive ? page : 1;
        const calculatedLimit = paginationActive ? limit : 10;

        const { tiposDisciplina: tiposDisciplina, total } =
            await this.gateway.findAll(
                descricao,
                calculatedPage,
                calculatedLimit
            );

        return this.presentOutput(
            tiposDisciplina,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        tiposDisciplina: TipoDisciplinaProps[],
        page: number,
        limit: number,
        total: number
    ): UpdateTipoDisciplinaOutputDto {
        return {
            tiposDisciplina: tiposDisciplina,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
