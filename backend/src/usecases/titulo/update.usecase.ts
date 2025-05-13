import { Titulo } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateTituloInputDto = {
    idTitulo: number;
    descricao: string;
};

export type UpdateTituloOutputDto = {
    idTitulo: number;
    descricao: string;
};

export class UpdateTituloUsecase
    implements Usecase<UpdateTituloInputDto, UpdateTituloOutputDto>
{
    constructor(private readonly tituloGateway: TituloGateway) {}

    async execute(input: UpdateTituloInputDto): Promise<UpdateTituloOutputDto> {
        const titulo = await this.tituloGateway.findById(input.idTitulo);

        if (!titulo) {
            throw new AppError("Titulo não encontrado", 404);
        }

        if (
            (await this.tituloGateway.existsByDescricao(input.descricao)) &&
            input.descricao !== titulo.descricao
        ) {
            throw new AppError("Titulo já cadastrado", 409);
        }

        titulo.update(input.descricao);

        const result = await this.tituloGateway.update(titulo);

        if (!result) {
            throw new AppError("Erro ao atualizar titulo", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(titulo: Titulo): UpdateTituloOutputDto {
        return {
            idTitulo: titulo.idTitulo!,
            descricao: titulo.descricao,
        };
    }
}
