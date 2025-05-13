import { TituloProps } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllTituloInputDto = {
    descricao: string | null;
    page: number | null;
    limit: number | null;
};

export type FindAllTituloOutputDto = {
    titulos: TituloProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllTituloUsecase
    implements Usecase<FindAllTituloInputDto, FindAllTituloOutputDto>
{
    constructor(private tituloGateway: TituloGateway) {}

    async execute({
        descricao,
        page,
        limit,
    }: FindAllTituloInputDto): Promise<FindAllTituloOutputDto> {
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

        const { titulos: titulos, total } = await this.tituloGateway.findAll(
            descricao,
            calculatedPage,
            calculatedLimit
        );

        return this.presentOutput(
            titulos,
            total,
            calculatedPage,
            calculatedLimit
        );
    }

    private presentOutput(
        titulos: TituloProps[],
        total: number,
        page: number,
        limit: number
    ): FindAllTituloOutputDto {
        return {
            titulos: titulos,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
