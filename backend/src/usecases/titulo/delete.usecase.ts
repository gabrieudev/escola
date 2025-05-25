import { ProfessorGateway } from "../../domain/professor/gateway/professor.gateway";
import { Titulo } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteTituloInputDto = {
    idTitulo: number;
};

export type DeleteTituloOutputDto = {
    idTitulo: number;
    descricao: string;
};

export class DeleteTituloUsecase
    implements Usecase<DeleteTituloInputDto, DeleteTituloOutputDto>
{
    constructor(
        private readonly tituloGateway: TituloGateway,
        private readonly professorGateway: ProfessorGateway
    ) {}

    static create(
        tituloGateway: TituloGateway,
        professorGateway: ProfessorGateway
    ) {
        return new DeleteTituloUsecase(tituloGateway, professorGateway);
    }

    async execute(input: DeleteTituloInputDto): Promise<DeleteTituloOutputDto> {
        const titulo = await this.tituloGateway.findById(input.idTitulo);

        if (!titulo) {
            throw new AppError("Titulo não encontrado", 404);
        }

        if (await this.professorGateway.existsByIdTitulo(input.idTitulo)) {
            throw new AppError("Titulo possui professores cadastrados", 409);
        }

        const result = await this.tituloGateway.delete(input.idTitulo);

        if (!result) {
            throw new AppError("Erro ao deletar titulo", 500);
        }

        return this.presentOutput(titulo);
    }

    private presentOutput(titulo: Titulo): DeleteTituloOutputDto {
        return {
            idTitulo: titulo.idTitulo!,
            descricao: titulo.descricao,
        };
    }
}
