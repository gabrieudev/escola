import { CursoProps } from "../../domain/curso/entity/curso";
import { Disciplina } from "../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { TipoDisciplinaProps } from "../../domain/tipo_disciplina/entity/tipo-disciplina";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindDisciplinaByIdInputDto = {
    idDisciplina: number;
};

export type FindDisciplinaByIdOutputDto = {
    idDisciplina: number | null;
    curso: CursoProps;
    tipoDisciplina: TipoDisciplinaProps;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class FindByIdDisciplinaUseCase
    implements Usecase<FindDisciplinaByIdInputDto, FindDisciplinaByIdOutputDto>
{
    constructor(private disciplinaGateway: DisciplinaGateway) {}

    static create(disciplinaGateway: DisciplinaGateway) {
        return new FindByIdDisciplinaUseCase(disciplinaGateway);
    }

    async execute(
        input: FindDisciplinaByIdInputDto
    ): Promise<FindDisciplinaByIdOutputDto> {
        const disciplina = await this.disciplinaGateway.findById(
            input.idDisciplina
        );

        if (!disciplina) {
            throw new AppError("Disciplina não encontrada", 404);
        }

        return this.presentOutput(disciplina);
    }

    private presentOutput(disciplina: Disciplina): FindDisciplinaByIdOutputDto {
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
