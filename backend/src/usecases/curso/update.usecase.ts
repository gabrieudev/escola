import { Curso } from "../../domain/curso/entity/curso";
import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import { InstituicaoProps } from "../../domain/instituicao/entity/instituicao";
import { TipoCursoProps } from "../../domain/tipo_curso/entity/tipo-curso";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateCursoInputDto = {
    idCurso: number;
    descricao: string;
};

export type UpdateCursoOutputDto = {
    idCurso: number;
    descricao: string;
    instituicao: InstituicaoProps;
    tipoCurso: TipoCursoProps;
};

export class UpdateCursoUseCase
    implements Usecase<UpdateCursoInputDto, UpdateCursoOutputDto>
{
    constructor(private readonly cursoGateway: CursoGateway) {}

    static create(cursoGateway: CursoGateway): UpdateCursoUseCase {
        return new UpdateCursoUseCase(cursoGateway);
    }

    async execute(input: UpdateCursoInputDto): Promise<UpdateCursoOutputDto> {
        const curso = await this.cursoGateway.findById(input.idCurso);

        if (!curso) {
            throw new AppError("Curso não encontrado", 404);
        }

        curso.update(input.descricao);

        const result = await this.cursoGateway.update(curso);

        if (!result) {
            throw new AppError("Erro ao atualizar curso", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(curso: Curso): UpdateCursoOutputDto {
        return {
            idCurso: curso.idCurso!,
            descricao: curso.descricao,
            instituicao: curso.instituicao,
            tipoCurso: curso.tipoCurso,
        };
    }
}
