import { Cursa } from "../entity/cursa";

export interface CursaGateway {
    create(cursa: Cursa): Promise<void>;

    update(cursa: Cursa, id_cursa: number): Promise<void>;

    delete(id_cursa: number): Promise<void>;

    findById(id_cursa: number): Promise<Cursa>;

    findAll(
        id_aluno: number | null,
        id_disciplina: number | null,
        page: number | null,
        limit: number | null
    ): Promise<Cursa[]>;
}
