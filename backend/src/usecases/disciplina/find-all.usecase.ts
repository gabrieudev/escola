import { CursoProps } from "../../domain/curso/entity/curso";
import {
    Disciplina,
    DisciplinaProps,
} from "../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { TipoDisciplinaProps } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllDisciplinaInputDto = {
    idCurso: number | null;
    idTipoDisciplina: number | null;
    sigla: string | null;
    descricao: string | null;
    periodo: number | null;
    page: number | null;
    limit: number | null;
};

export type FindAllDisciplinaOutputDto = {
    disciplinas: DisciplinaProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllDisciplinaUsecase
    implements Usecase<FindAllDisciplinaInputDto, FindAllDisciplinaOutputDto>
{
    constructor(private disciplinaGateway: DisciplinaGateway) {}

    async execute({
        idCurso,
        idTipoDisciplina,
        sigla,
        descricao,
        periodo,
        page,
        limit,
    }: FindAllDisciplinaInputDto): Promise<FindAllDisciplinaOutputDto> {
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

        const { data: disciplinas, total } =
            await this.disciplinaGateway.findAll(
                idCurso,
                idTipoDisciplina,
                sigla,
                descricao,
                periodo,
                calculatedPage,
                calculatedLimit
            );

        return this.presentOutput(
            disciplinas,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        disciplinas: DisciplinaProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllDisciplinaOutputDto {
        return {
            disciplinas,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
