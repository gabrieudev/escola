import { Leciona } from "../entity/leciona";

export interface LecionaGateway {
    create(leciona: Leciona): Promise<Leciona | null>;

    existsByIdDisciplinaAndIdProfessor(
        idDisciplina: number,
        idProfessor: number
    ): Promise<boolean>;

    existsByIdDisciplina(idDisciplina: number): Promise<boolean>;

    existsByIdProfessor(idProfessor: number): Promise<boolean>;
}
