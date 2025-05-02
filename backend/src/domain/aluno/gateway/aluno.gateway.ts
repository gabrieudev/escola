import { Aluno, AlunoProps } from "../entity/aluno";

export interface AlunoGateway {
    create(aluno: Aluno): Promise<Aluno | null>;

    update(aluno: Aluno): Promise<Aluno | null>;

    delete(id_aluno: number): Promise<boolean>;

    findById(id_aluno: number): Promise<Aluno | null>;

    findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: AlunoProps[]; total: number }>;

    existsByNome(tx_nome: string): Promise<boolean>;

    existsById(id_aluno: number): Promise<boolean>;
}
