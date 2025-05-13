import { CursoProps } from "../../domain/curso/entity/curso";
import { Disciplina } from "../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { TipoDisciplinaProps } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateDisciplinaInputDto = {
    idDisciplina: number;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export type UpdateDisciplinaOutputDto = {
    idDisciplina: number | null;
    curso: CursoProps;
    tipoDisciplina: TipoDisciplinaProps;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class UpdateDisciplinaUseCase
    implements Usecase<UpdateDisciplinaInputDto, UpdateDisciplinaOutputDto>
{
    constructor(private disciplinaGateway: DisciplinaGateway) {}

    async execute(
        input: UpdateDisciplinaInputDto
    ): Promise<UpdateDisciplinaOutputDto> {
        const disciplina = await this.disciplinaGateway.findById(
            input.idDisciplina
        );

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        disciplina.update(
            input.sigla,
            input.descricao,
            input.periodo,
            input.cargaHoraria
        );

        const result = await this.disciplinaGateway.update(disciplina);

        if (!result) {
            throw new AppError("Erro ao atualizar disciplina", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(disciplina: Disciplina): UpdateDisciplinaOutputDto {
        return {
            idDisciplina: disciplina.idDisciplina!,
            curso: disciplina.curso,
            tipoDisciplina: disciplina.tipoDisciplina,
            sigla: disciplina.sigla,
            descricao: disciplina.descricao,
            periodo: disciplina.periodo,
            cargaHoraria: disciplina.cargaHoraria,
        };
    }
}
