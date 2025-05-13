import { CursoProps } from "../../domain/curso/entity/curso";
import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllCursoInputDto = {
    descricao: string | null;
    idInstituicao: number | null;
    idTipoCurso: number | null;
    page: number | null;
    limit: number | null;
};

export type FindAllCursoOutputDto = {
    cursos: CursoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllCursoUsecase
    implements Usecase<FindAllCursoInputDto, FindAllCursoOutputDto>
{
    constructor(private cursoGateway: CursoGateway) {}

    async execute({
        descricao,
        idInstituicao,
        idTipoCurso,
        page,
        limit,
    }: FindAllCursoInputDto): Promise<FindAllCursoOutputDto> {
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

        const { data: cursos, total } = await this.cursoGateway.findAll(
            descricao,
            idInstituicao,
            idTipoCurso,
            calculatedPage,
            calculatedLimit
        );

        return this.presentOutput(
            cursos,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        cursos: CursoProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllCursoOutputDto {
        return {
            cursos,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
