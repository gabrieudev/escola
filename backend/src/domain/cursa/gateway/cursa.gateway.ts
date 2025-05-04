import { Cursa } from "../entity/cursa";

export interface CursaGateway {
    create(cursa: Cursa): Promise<Cursa | null>;

    update(cursa: Cursa): Promise<Cursa | null>;

    delete(idCursa: number): Promise<boolean>;

    findById(idCursa: number): Promise<Cursa | null>;

    findAll(
        idAluno: number | null,
        idDisciplina: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: Cursa[]; total: number }>;
}
