import { TipoCurso } from "../../domain/tipo_curso/entity/tipo-curso";
import { TipoCursoGateway } from "../../domain/tipo_curso/gateway/tipo-curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateTipoCursoInputDto = {
    descricao: string;
};

export type CreateTipoCursoOutputDto = {
    idTipoCurso: number;
    descricao: string;
};

export class CreateTipoCursoUsecase
    implements Usecase<CreateTipoCursoInputDto, CreateTipoCursoOutputDto>
{
    constructor(private readonly gateway: TipoCursoGateway) {}

    public static create(gateway: TipoCursoGateway) {
        return new CreateTipoCursoUsecase(gateway);
    }

    async execute(
        input: CreateTipoCursoInputDto
    ): Promise<CreateTipoCursoOutputDto> {
        const tipoCurso = TipoCurso.create(null, input.descricao);

        if (await this.gateway.existsByDescricao(tipoCurso.descricao)) {
            throw new AppError("Tipo de curso já cadastrado", 409);
        }

        const result = await this.gateway.create(tipoCurso);

        if (!result) {
            throw new AppError("Erro ao cadastrar tipo de curso", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(tipoCurso: TipoCurso): CreateTipoCursoOutputDto {
        const output: CreateTipoCursoOutputDto = {
            idTipoCurso: tipoCurso.idTipoCurso!,
            descricao: tipoCurso.descricao,
        };

        return output;
    }
}
