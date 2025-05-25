import { Cursa, CursaProps } from "../entity/cursa";

export interface CursaGateway {
    create(cursa: Cursa): Promise<Cursa | null>;

    update(cursa: Cursa): Promise<Cursa | null>;

    delete(idAluno: number, idDisciplina: number): Promise<boolean>;

    findById(idAluno: number, idDisciplina: number): Promise<Cursa | null>;

    findAll(
        idAluno: number | null,
        idDisciplina: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: CursaProps[]; total: number }>;

    existsByIdAlunoAndIdDisciplina(
        idAluno: number,
        idDisciplina: number
    ): Promise<boolean>;

    existsByIdAluno(idAluno: number): Promise<boolean>;

    existsByIdDisciplina(idDisciplina: number): Promise<boolean>;
}
