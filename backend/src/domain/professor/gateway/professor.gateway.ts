import { Professor } from "../entity/professor";

export interface ProfessorGateway {
    create(professor: Professor): Promise<Professor>;

    update(professor: Professor, id_professor: number): Promise<Professor>;

    delete(id_professor: number): Promise<void>;

    findById(id_professor: number): Promise<Professor>;

    findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<Professor[]>;
}
