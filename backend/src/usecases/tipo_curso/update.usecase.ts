import { TipoCurso } from "../../domain/tipo_curso/entity/tipo-curso";
import { TipoCursoGateway } from "../../domain/tipo_curso/gateway/tipo-curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateTipoCursoInputDto = {
    idTipoCurso: number;
    descricao: string;
};

export type UpdateTipoCursoOutputDto = {
    idTipoCurso: number;
    descricao: string;
};

export class UpdateTipoCursoUsecase
    implements Usecase<UpdateTipoCursoInputDto, UpdateTipoCursoOutputDto>
{
    constructor(private readonly gateway: TipoCursoGateway) {}

    public static create(gateway: TipoCursoGateway) {
        return new UpdateTipoCursoUsecase(gateway);
    }

    async execute(
        input: UpdateTipoCursoInputDto
    ): Promise<UpdateTipoCursoOutputDto> {
        const tipoCurso = await this.gateway.findById(input.idTipoCurso);

        if (!tipoCurso) {
            throw new AppError("Tipo de curso não encontrado", 404);
        }

        if (
            (await this.gateway.existsByDescricao(input.descricao)) &&
            input.descricao !== tipoCurso.descricao
        ) {
            throw new AppError("Tipo de curso já cadastrado", 409);
        }

        tipoCurso.update(input.descricao);

        const result = await this.gateway.update(tipoCurso);

        if (!result) {
            throw new AppError("Erro ao atualizar tipo de curso", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(tipoCurso: TipoCurso): UpdateTipoCursoOutputDto {
        return {
            idTipoCurso: tipoCurso.idTipoCurso!,
            descricao: tipoCurso.descricao,
        };
    }
}
