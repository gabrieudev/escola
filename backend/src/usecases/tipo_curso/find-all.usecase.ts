import { TipoCursoProps } from "../../domain/tipo_curso/entity/tipo-curso";
import { TipoCursoGateway } from "../../domain/tipo_curso/gateway/tipo-curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllTipoCursoInputDto = {
    descricao: string | null;
    page: number | null;
    limit: number | null;
};

export type FindAllTipoCursoOutputDto = {
    tiposCurso: TipoCursoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllTipoCursoUsecase
    implements Usecase<FindAllTipoCursoInputDto, FindAllTipoCursoOutputDto>
{
    constructor(private readonly tipoCursoGateway: TipoCursoGateway) {}

    public static create(gateway: TipoCursoGateway) {
        return new FindAllTipoCursoUsecase(gateway);
    }

    public async execute({
        descricao,
        page,
        limit,
    }: FindAllTipoCursoInputDto): Promise<FindAllTipoCursoOutputDto> {
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

        const { data: alunos, total } = await this.tipoCursoGateway.findAll(
            descricao,
            page,
            limit
        );

        const paginationActive = page !== null && limit !== null;

        const calculatedPage = paginationActive ? page : 1;
        const calculatedLimit = paginationActive ? limit : total;

        return this.presentOutput(
            alunos,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        tiposCurso: TipoCursoProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllTipoCursoOutputDto {
        return {
            tiposCurso,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
