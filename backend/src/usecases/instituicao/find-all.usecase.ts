import {
    InstituicaoProps
} from "../../domain/instituicao/entity/instituicao";
import { InstituicaoGateway } from "../../domain/instituicao/gateway/instituicao.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllInstituicaoInputDto = {
    sigla: string | null;
    page: number | null;
    limit: number | null;
};

export type FindAllInstituicaoOutputDto = {
    instituicoes: InstituicaoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllInstituicaoUsecase
    implements Usecase<FindAllInstituicaoInputDto, FindAllInstituicaoOutputDto>
{
    constructor(private readonly instituicaoGateway: InstituicaoGateway) {}

    static create(
        instituicaoGateway: InstituicaoGateway
    ): FindAllInstituicaoUsecase {
        return new FindAllInstituicaoUsecase(instituicaoGateway);
    }

    async execute({
        sigla,
        page,
        limit,
    }: FindAllInstituicaoInputDto): Promise<FindAllInstituicaoOutputDto> {
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

        const { data: instituicoes, total } =
            await this.instituicaoGateway.findAll(
                sigla,
                calculatedPage,
                calculatedLimit
            );

        return this.presentOutput(
            instituicoes,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        instituicoes: InstituicaoProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllInstituicaoOutputDto {
        return {
            instituicoes,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
