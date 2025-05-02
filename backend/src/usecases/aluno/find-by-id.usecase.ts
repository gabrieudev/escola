import { Aluno } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdAlunoInputDto = {
    id_aluno: number;
};

export type FindByIdAlunoOutputDto = {
    id_aluno: number | null;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export class FindByIdAlunoUsecase
    implements Usecase<FindByIdAlunoInputDto, FindByIdAlunoOutputDto>
{
    constructor(private alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new FindByIdAlunoUsecase(alunoGateway);
    }

    async execute({
        id_aluno,
    }: FindByIdAlunoInputDto): Promise<FindByIdAlunoOutputDto> {
        const aluno = await this.alunoGateway.findById(id_aluno);

        if (!aluno) {
            throw new AppError("Aluno não encontrado.", 404);
        }

        return this.presentOutput(aluno);
    }

    private presentOutput(aluno: Aluno): FindByIdAlunoOutputDto {
        const output: FindByIdAlunoOutputDto = {
            id_aluno: aluno.id_aluno!,
            tx_nome: aluno.tx_nome,
            tx_sexo: aluno.tx_sexo,
            dt_nascimento: aluno.dt_nascimento,
        };

        return output;
    }
}
