import { Aluno } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateAlunoInputDto = {
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export type CreateAlunoOutputDto = {
    id_aluno: number;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export class CreateAlunoUsecase
    implements Usecase<CreateAlunoInputDto, CreateAlunoOutputDto>
{
    private constructor(private readonly alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new CreateAlunoUsecase(alunoGateway);
    }

    public async execute({
        tx_nome,
        tx_sexo,
        dt_nascimento,
    }: CreateAlunoInputDto): Promise<CreateAlunoOutputDto> {
        const aluno = Aluno.create(null, tx_nome, tx_sexo, dt_nascimento);

        if (await this.alunoGateway.existsByNome(tx_nome)) {
            throw new AppError("Aluno já cadastrado com esse nome.", 409);
        }

        const createdAluno = await this.alunoGateway.create(aluno);

        if (!createdAluno) {
            throw new AppError("Erro ao criar aluno.", 500);
        }

        return this.presentOutput(createdAluno);
    }

    private presentOutput(aluno: Aluno): CreateAlunoOutputDto {
        const output: CreateAlunoOutputDto = {
            id_aluno: aluno.id_aluno!,
            tx_nome: aluno.tx_nome,
            tx_sexo: aluno.tx_sexo,
            dt_nascimento: aluno.dt_nascimento,
        };

        return output;
    }
}
