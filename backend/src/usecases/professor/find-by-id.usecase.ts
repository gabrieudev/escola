import { Professor } from "../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import { TituloProps } from "../../domain/titulo/entity/titulo";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindProfessorByIdInputDto = {
    idProfessor: number;
};

export type FindProfessorByIdOutputDto = {
    idProfessor: number;
    titulo: TituloProps;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export class FindByIdProfessorUsecase
    implements Usecase<FindProfessorByIdInputDto, FindProfessorByIdOutputDto>
{
    constructor(private readonly professorGateway: ProfessorGateway) {}

    static create(professorGateway: ProfessorGateway) {
        return new FindByIdProfessorUsecase(professorGateway);
    }

    async execute(
        input: FindProfessorByIdInputDto
    ): Promise<FindProfessorByIdOutputDto> {
        const professor = await this.professorGateway.findById(
            input.idProfessor
        );

        if (!professor) {
            throw new AppError("Professor não encontrado", 404);
        }

        return this.presentOutput(professor);
    }

    private presentOutput(result: Professor): FindProfessorByIdOutputDto {
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
