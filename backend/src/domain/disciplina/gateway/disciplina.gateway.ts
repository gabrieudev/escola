import { Disciplina, DisciplinaProps } from "../entity/disciplina";

export interface DisciplinaGateway {
    create(disciplina: Disciplina): Promise<Disciplina | null>;

    update(disciplina: Disciplina): Promise<Disciplina | null>;

    delete(idDisciplina: number): Promise<boolean>;

    findById(idDisciplina: number): Promise<Disciplina | null>;

    findAll(
        idCurso: number | null,
        idTipoDisciplina: number | null,
        sigla: string | null,
        descricao: string | null,
        periodo: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: DisciplinaProps[]; total: number }>;

    existsById(idDisciplina: number): Promise<boolean>;

    existsByIdCurso(idCurso: number): Promise<boolean>;

    existsByIdTipoDisciplina(idTipoDisciplina: number): Promise<boolean>;
}
