import { Aluno } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateAlunoInputDto = {
    id_aluno: number;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export type UpdateAlunoOutputDto = {
    id_aluno: number;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export class UpdateAlunoUsecase
    implements Usecase<UpdateAlunoInputDto, UpdateAlunoOutputDto>
{
    private constructor(private readonly alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new UpdateAlunoUsecase(alunoGateway);
    }

    public async execute({
        id_aluno,
        tx_nome,
        tx_sexo,
        dt_nascimento,
    }: UpdateAlunoInputDto): Promise<UpdateAlunoOutputDto> {
        const alunoToUpdate = await this.alunoGateway.findById(id_aluno);

        if (!alunoToUpdate) {
            throw new AppError("Aluno não encontrado.", 404);
        }

        alunoToUpdate.update(tx_nome, tx_sexo, dt_nascimento);

        const updatedAluno = await this.alunoGateway.update(alunoToUpdate);

        if (!updatedAluno) {
            throw new AppError("Erro ao atualizar aluno.", 500);
        }

        return this.presentOutput(updatedAluno);
    }

    private presentOutput(aluno: Aluno): UpdateAlunoOutputDto {
        const output: UpdateAlunoOutputDto = {
            id_aluno: aluno.id_aluno!,
            tx_nome: aluno.tx_nome,
            tx_sexo: aluno.tx_sexo,
            dt_nascimento: aluno.dt_nascimento,
        };

        return output;
    }
}
