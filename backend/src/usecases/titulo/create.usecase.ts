import { Titulo } from "../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../domain/titulo/gateway/titulo.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateTituloInputDto = {
    descricao: string;
};

export type CreateTituloOutputDto = {
    idTitulo: number;
    descricao: string;
};

export class CreateTituloUsecase
    implements Usecase<CreateTituloInputDto, CreateTituloOutputDto>
{
    constructor(private readonly tituloGateway: TituloGateway) {}

    static create(tituloGateway: TituloGateway) {
        return new CreateTituloUsecase(tituloGateway);
    }

    async execute(input: CreateTituloInputDto): Promise<CreateTituloOutputDto> {
        if (await this.tituloGateway.existsByDescricao(input.descricao)) {
            throw new AppError("Titulo já cadastrado", 409);
        }

        const titulo = Titulo.create(null, input.descricao);

        const result = await this.tituloGateway.create(titulo);

        if (!result) {
            throw new AppError("Erro ao cadastrar titulo", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(titulo: Titulo): CreateTituloOutputDto {
        return {
            idTitulo: titulo.idTitulo!,
            descricao: titulo.descricao,
        };
    }
}
