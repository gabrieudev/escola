import { ProfessorProps } from "../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllProfessorInputDto = {
    nome: string | null;
    idTitulo: number | null;
    page: number | null;
    limit: number | null;
};

export type FindAllProfessorOutputDto = {
    professores: ProfessorProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllProfessorUsecase
    implements Usecase<FindAllProfessorInputDto, FindAllProfessorOutputDto>
{
    constructor(private readonly professorGateway: ProfessorGateway) {}

    async execute({
        nome,
        idTitulo,
        page,
        limit,
    }: FindAllProfessorInputDto): Promise<FindAllProfessorOutputDto> {
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

        const { data: professores, total } =
            await this.professorGateway.findAll(
                nome,
                idTitulo,
                calculatedPage,
                calculatedLimit
            );

        return this.presentOutput(
            professores,
            calculatedPage,
            calculatedLimit,
            total
        );
    }

    private presentOutput(
        professores: ProfessorProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllProfessorOutputDto {
        return {
            professores: professores,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
