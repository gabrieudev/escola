import { Professor } from "../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import { TituloProps } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateProfessorInputDto = {
    titulo: TituloProps;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export type CreateProfessorOutputDto = {
    idProfessor: number;
    titulo: TituloProps;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export class CreateProfessorUsecase
    implements Usecase<CreateProfessorInputDto, CreateProfessorOutputDto>
{
    constructor(
        private readonly professorGateway: ProfessorGateway,
        private readonly tituloGateway: TituloGateway
    ) {}

    async execute(
        input: CreateProfessorInputDto
    ): Promise<CreateProfessorOutputDto> {
        if (await this.professorGateway.existsByNome(input.nome)) {
            throw new AppError("Professor já cadastrado", 409);
        }

        const titulo = await this.tituloGateway.findById(
            input.titulo.idTitulo!
        );

        if (!titulo) {
            throw new AppError("Titulo não encontrado", 404);
        }

        const professor = Professor.create(
            null,
            titulo,
            input.nome,
            input.sexo,
            input.estadoCivil,
            input.dtNascimento,
            input.telefone
        );

        const result = await this.professorGateway.create(professor);

        if (!result) {
            throw new AppError("Erro ao cadastrar professor", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(result: Professor): CreateProfessorOutputDto {
        return {
            idProfessor: result.idProfessor!,
            titulo: result.titulo,
            nome: result.nome,
            sexo: result.sexo,
            estadoCivil: result.estadoCivil,
            dtNascimento: result.dtNascimento,
            telefone: result.telefone,
        };
    }
}
