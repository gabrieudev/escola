import { Professor, ProfessorProps } from "../entity/professor";

export interface ProfessorGateway {
    create(professor: Professor): Promise<Professor | null>;

    update(professor: Professor): Promise<Professor | null>;

    delete(idProfessor: number): Promise<boolean>;

    findById(idProfessor: number): Promise<Professor | null>;

    findAll(
        nome: string | null,
        idTitulo: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: ProfessorProps[]; total: number }>;

    existsByNome(nome: string): Promise<boolean>;

    existsById(idProfessor: number): Promise<boolean>;

    existsByIdTitulo(idTitulo: number): Promise<boolean>;
}
