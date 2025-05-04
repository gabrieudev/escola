import { Aluno } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdAlunoInputDto = {
    idAluno: number;
};

export type FindByIdAlunoOutputDto = {
    idAluno: number | null;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class FindByIdAlunoUsecase
    implements Usecase<FindByIdAlunoInputDto, FindByIdAlunoOutputDto>
{
    constructor(private alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new FindByIdAlunoUsecase(alunoGateway);
    }

    async execute({
        idAluno,
    }: FindByIdAlunoInputDto): Promise<FindByIdAlunoOutputDto> {
        const aluno = await this.alunoGateway.findById(idAluno);

        if (!aluno) {
            throw new AppError("Aluno não encontrado.", 404);
        }

        return this.presentOutput(aluno);
    }

    private presentOutput(aluno: Aluno): FindByIdAlunoOutputDto {
        const output: FindByIdAlunoOutputDto = {
            idAluno: aluno.idAluno!,
            nome: aluno.nome,
            sexo: aluno.sexo,
            dtNascimento: aluno.dtNascimento,
        };

        return output;
    }
}
