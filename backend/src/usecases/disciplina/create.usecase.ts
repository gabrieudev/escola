import { CursoProps } from "../../domain/curso/entity/curso";
import {
    Disciplina,
    DisciplinaProps,
} from "../../domain/disciplina/entity/disciplina";
import { TipoDisciplinaProps } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { Usecase } from "../usecase";
import AppError from "../../utils/app-error";
import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import { TipoDisciplinaGateway } from "../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";

export type CreateDisciplinaInputDto = {
    idCurso: number;
    idTipoDisciplina: number;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export type CreateDisciplinaOutputDto = {
    idDisciplina: number | null;
    curso: CursoProps;
    tipoDisciplina: TipoDisciplinaProps;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class CreateDisciplinaUsecase
    implements Usecase<CreateDisciplinaInputDto, CreateDisciplinaOutputDto>
{
    constructor(
        private readonly disciplinaGateway: DisciplinaGateway,
        private readonly cursoGateway: CursoGateway,
        private readonly tipoDisciplinaGateway: TipoDisciplinaGateway
    ) {}

    static create(
        disciplinaGateway: DisciplinaGateway,
        cursoGateway: CursoGateway,
        tipoDisciplinaGateway: TipoDisciplinaGateway
    ): CreateDisciplinaUsecase {
        return new CreateDisciplinaUsecase(
            disciplinaGateway,
            cursoGateway,
            tipoDisciplinaGateway
        );
    }

    async execute(
        input: CreateDisciplinaInputDto
    ): Promise<CreateDisciplinaOutputDto> {
        const curso = await this.cursoGateway.findById(input.idCurso!);
        const tipoDisciplina = await this.tipoDisciplinaGateway.findById(
            input.idTipoDisciplina!
        );

        if (!curso) {
            throw new AppError("Curso não encontrado", 404);
        }

        if (!tipoDisciplina) {
            throw new AppError("Tipo de disciplina não encontrado", 404);
        }

        const disciplina = Disciplina.create(
            null,
            curso,
            tipoDisciplina,
            input.sigla,
            input.descricao,
            input.periodo,
            input.cargaHoraria
        );

        const result = await this.disciplinaGateway.create(disciplina);

        if (!result) {
            throw new AppError("Erro ao cadastrar disciplina", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(
        disciplina: DisciplinaProps
    ): CreateDisciplinaOutputDto {
        return {
            idDisciplina: disciplina.idDisciplina,
            curso: disciplina.curso,
            tipoDisciplina: disciplina.tipoDisciplina,
            sigla: disciplina.sigla,
            descricao: disciplina.descricao,
            periodo: disciplina.periodo,
            cargaHoraria: disciplina.cargaHoraria,
        };
    }
}
