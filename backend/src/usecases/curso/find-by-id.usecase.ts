import { CursoProps } from "../../domain/curso/entity/curso";
import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import { InstituicaoProps } from "../../domain/instituicao/entity/instituicao";
import { TipoCursoProps } from "../../domain/tipo_curso/entity/tipo-curso";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdCursoInputDto = {
    idCurso: number;
};

export type FindByIdCursoOutputDto = {
    idCurso: number;
    descricao: string;
    instituicao: InstituicaoProps;
    tipoCurso: TipoCursoProps;
};

export class FindByIdCursoUsecase
    implements Usecase<FindByIdCursoInputDto, FindByIdCursoOutputDto>
{
    constructor(private cursoGateway: CursoGateway) {}

    static create(cursoGateway: CursoGateway): FindByIdCursoUsecase {
        return new FindByIdCursoUsecase(cursoGateway);
    }

    async execute(
        input: FindByIdCursoInputDto
    ): Promise<FindByIdCursoOutputDto> {
        const curso = await this.cursoGateway.findById(input.idCurso);

        if (!curso) {
            throw new AppError("Curso não encontrado", 404);
        }

        return this.presentOutput(curso);
    }

    private presentOutput(curso: CursoProps): FindByIdCursoOutputDto {
        return {
            idCurso: curso.idCurso!,
            descricao: curso.descricao,
            instituicao: curso.instituicao,
            tipoCurso: curso.tipoCurso,
        };
    }
}
