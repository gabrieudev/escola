import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import { CursaProps } from "../../domain/cursa/entity/cursa";
import { CursaGateway } from "../../domain/cursa/gateway/cursa.gateway";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllCursaInputDto = {
    idAluno: number | null;
    idDisciplina: number | null;
    page: number | null;
    limit: number | null;
};

export type FindAllCursaOutputDto = {
    matriculas: CursaProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllCursaUsecase
    implements Usecase<FindAllCursaInputDto, FindAllCursaOutputDto>
{
    constructor(private cursaGateway: CursaGateway) {}

    static create(cursaGateway: CursaGateway) {
        return new FindAllCursaUsecase(cursaGateway);
    }

    async execute({
        idAluno,
        idDisciplina,
        page,
        limit,
    }: FindAllCursaInputDto): Promise<FindAllCursaOutputDto> {
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

        const { data: matriculas, total } = await this.cursaGateway.findAll(
            idAluno,
            idDisciplina,
            page,
            limit
        );

        const paginationActive = page !== null && limit !== null;

        const calculatedPage = paginationActive ? page : 1;
        const calculatedLimit = paginationActive ? limit : total;

        return this.presentOutput(
            matriculas,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        matriculas: CursaProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllCursaOutputDto {
        return {
            matriculas,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
