import { TipoCurso } from "../../domain/tipo_curso/entity/tipo-curso";
import { TipoCursoGateway } from "../../domain/tipo_curso/gateway/tipo-curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdTipoCursoInputDto = {
    idTipoCurso: number;
};

export type FindByIdTipoCursoOutputDto = {
    idTipoCurso: number;
    descricao: string;
};

export class FindByIdTipoCursoUsecase
    implements Usecase<FindByIdTipoCursoInputDto, FindByIdTipoCursoOutputDto>
{
    constructor(private readonly gateway: TipoCursoGateway) {}

    public static create(gateway: TipoCursoGateway) {
        return new FindByIdTipoCursoUsecase(gateway);
    }

    async execute(
        input: FindByIdTipoCursoInputDto
    ): Promise<FindByIdTipoCursoOutputDto> {
        const tipoCurso = await this.gateway.findById(input.idTipoCurso);

        if (!tipoCurso) {
            throw new AppError("Tipo de curso não encontrado", 404);
        }

        return this.presentOutput(tipoCurso);
    }

    private presentOutput(tipoCurso: TipoCurso): FindByIdTipoCursoOutputDto {
        return {
            idTipoCurso: tipoCurso.idTipoCurso!,
            descricao: tipoCurso.descricao,
        };
    }
}
