import { Aluno } from "../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../domain/aluno/gateway/aluno.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateAlunoInputDto = {
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export type CreateAlunoOutputDto = {
    idAluno: number;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class CreateAlunoUsecase
    implements Usecase<CreateAlunoInputDto, CreateAlunoOutputDto>
{
    private constructor(private readonly alunoGateway: AlunoGateway) {}

    public static create(alunoGateway: AlunoGateway) {
        return new CreateAlunoUsecase(alunoGateway);
    }

    public async execute({
        nome,
        sexo,
        dtNascimento,
    }: CreateAlunoInputDto): Promise<CreateAlunoOutputDto> {
        const aluno = Aluno.create(null, nome, sexo, dtNascimento);

        if (await this.alunoGateway.existsByNome(nome)) {
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
            idAluno: aluno.idAluno!,
            nome: aluno.nome,
            sexo: aluno.sexo,
            dtNascimento: aluno.dtNascimento,
        };

        return output;
    }
}
