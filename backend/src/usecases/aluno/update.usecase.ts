import { Aluno } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateAlunoInputDto = {
    idAluno: number;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export type UpdateAlunoOutputDto = {
    idAluno: number;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class UpdateAlunoUsecase
    implements Usecase<UpdateAlunoInputDto, UpdateAlunoOutputDto>
{
    private constructor(private readonly alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new UpdateAlunoUsecase(alunoGateway);
    }

    public async execute({
        idAluno,
        nome,
        sexo,
        dtNascimento,
    }: UpdateAlunoInputDto): Promise<UpdateAlunoOutputDto> {
        const alunoToUpdate = await this.alunoGateway.findById(idAluno);

        if (!alunoToUpdate) {
            throw new AppError("Aluno não encontrado.", 404);
        }

        if (
            (await this.alunoGateway.existsByNome(nome)) &&
            nome !== alunoToUpdate.nome
        ) {
            throw new AppError("Aluno já cadastrado com esse nome.", 409);
        }

        alunoToUpdate.update(nome, sexo, dtNascimento);

        const updatedAluno = await this.alunoGateway.update(alunoToUpdate);

        if (!updatedAluno) {
            throw new AppError("Erro ao atualizar aluno.", 500);
        }

        return this.presentOutput(updatedAluno);
    }

    private presentOutput(aluno: Aluno): UpdateAlunoOutputDto {
        const output: UpdateAlunoOutputDto = {
            idAluno: aluno.idAluno!,
            nome: aluno.nome,
            sexo: aluno.sexo,
            dtNascimento: aluno.dtNascimento,
        };

        return output;
    }
}
