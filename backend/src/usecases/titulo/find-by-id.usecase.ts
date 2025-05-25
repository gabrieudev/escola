import { Titulo } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindTituloByIdInputDto = {
    idTitulo: number;
};

export type FindTituloByIdOutputDto = {
    idTitulo: number;
    descricao: string;
};

export class FindByIdTituloUsecase
    implements Usecase<FindTituloByIdInputDto, FindTituloByIdOutputDto>
{
    constructor(private readonly tituloGateway: TituloGateway) {}

    static create(tituloGateway: TituloGateway) {
        return new FindByIdTituloUsecase(tituloGateway);
    }

    async execute(
        input: FindTituloByIdInputDto
    ): Promise<FindTituloByIdOutputDto> {
        const titulo = await this.tituloGateway.findById(input.idTitulo);

        if (!titulo) {
            throw new AppError("Titulo não encontrado", 404);
        }

        return this.presentOutput(titulo);
    }

    private presentOutput(titulo: Titulo): FindTituloByIdOutputDto {
        return {
            idTitulo: titulo.idTitulo!,
            descricao: titulo.descricao,
        };
    }
}
