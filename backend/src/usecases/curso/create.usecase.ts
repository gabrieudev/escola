import { Curso } from "../../domain/curso/entity/curso";
import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import { InstituicaoProps } from "../../domain/instituicao/entity/instituicao";
import { InstituicaoGateway } from "../../domain/instituicao/gateway/instituicao.gateway";
import { TipoCursoProps } from "../../domain/tipo_curso/entity/tipo-curso";
import { TipoCursoGateway } from "../../domain/tipo_curso/gateway/tipo-curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateCursoInputDto = {
    descricao: string;
    idInstituicao: number;
    idTipoCurso: number;
};

export type CreateCursoOutputDto = {
    idCurso: number;
    descricao: string;
    instituicao: InstituicaoProps;
    tipoCurso: TipoCursoProps;
};

export class CreateCursoUsecase
    implements Usecase<CreateCursoInputDto, CreateCursoOutputDto>
{
    constructor(
        private readonly cursoGateway: CursoGateway,
        private readonly instituicaoGateway: InstituicaoGateway,
        private readonly tipoCursoGateway: TipoCursoGateway
    ) {}

    static create(
        cursoGateway: CursoGateway,
        instituicaoGateway: InstituicaoGateway,
        tipoCursoGateway: TipoCursoGateway
    ) {
        return new CreateCursoUsecase(
            cursoGateway,
            instituicaoGateway,
            tipoCursoGateway
        );
    }

    async execute(input: CreateCursoInputDto): Promise<CreateCursoOutputDto> {
        const instituicao = await this.instituicaoGateway.findById(
            input.idInstituicao!
        );
        const tipoCurso = await this.tipoCursoGateway.findById(
            input.idTipoCurso!
        );

        if (!instituicao) {
            throw new AppError("Instituição não encontrada", 404);
        }

        if (!tipoCurso) {
            throw new AppError("Tipo de curso não encontrado", 404);
        }

        const curso = Curso.create(
            null,
            input.descricao,
            instituicao,
            tipoCurso
        );

        const result = await this.cursoGateway.create(curso);

        if (!result) {
            throw new AppError("Erro ao cadastrar curso", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(curso: Curso): CreateCursoOutputDto {
        return {
            idCurso: curso.idCurso!,
            descricao: curso.descricao,
            instituicao: curso.instituicao,
            tipoCurso: curso.tipoCurso,
        };
    }
}
