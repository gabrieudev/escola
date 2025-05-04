import { AlunoProps } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindAllAlunoInputDto = {
    nome: string | null;
    page: number | null;
    limit: number | null;
};

export type FindAllAlunoOutputDto = {
    alunos: AlunoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllAlunoUsecase
    implements Usecase<FindAllAlunoInputDto, FindAllAlunoOutputDto>
{
    constructor(private alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new FindAllAlunoUsecase(alunoGateway);
    }

    public async execute({
        nome,
        page,
        limit,
    }: FindAllAlunoInputDto): Promise<FindAllAlunoOutputDto> {
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

        const { data: alunos, total } = await this.alunoGateway.findAll(
            nome,
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
        alunos: AlunoProps[],
        page: number,
        limit: number,
        total: number
    ): FindAllAlunoOutputDto {
        return {
            alunos,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
        };
    }
}
