import { Professor } from "../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import { Titulo, TituloProps } from "../../domain/titulo/entity/titulo";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateProfessorInputDto = {
    idProfessor: number;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export type UpdateProfessorOutputDto = {
    idProfessor: number;
    titulo: TituloProps;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export class UpdateProfessorUsecase
    implements Usecase<UpdateProfessorInputDto, UpdateProfessorOutputDto>
{
    constructor(private professorGateway: ProfessorGateway) {}

    static create(professorGateway: ProfessorGateway) {
        return new UpdateProfessorUsecase(professorGateway);
    }

    async execute(
        input: UpdateProfessorInputDto
    ): Promise<UpdateProfessorOutputDto> {
        const professor = await this.professorGateway.findById(
            input.idProfessor
        );

        if (!professor) {
            throw new AppError("Professor não encontrado", 404);
        }

        if (
            (await this.professorGateway.existsByNome(input.nome)) &&
            input.nome !== professor.nome
        ) {
            throw new AppError("Professor já cadastrado", 409);
        }

        professor.update(
            input.nome,
            input.sexo,
            input.estadoCivil,
            input.dtNascimento,
            input.telefone
        );

        const result = await this.professorGateway.update(professor);

        if (!result) {
            throw new AppError("Erro ao atualizar professor", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(result: Professor): UpdateProfessorOutputDto {
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
