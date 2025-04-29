import { Aluno } from "../entity/aluno";

export interface AlunoGateway {
    create(aluno: Aluno): Promise<Aluno | null>;

    update(aluno: Aluno): Promise<Aluno>;

    delete(id_aluno: number): Promise<void>;

    findById(id_aluno: number): Promise<Aluno>;

    findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<Aluno[]>;
}
