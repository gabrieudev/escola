import { Aluno, AlunoProps } from "../entity/aluno";

export interface AlunoGateway {
    create(aluno: Aluno): Promise<Aluno | null>;

    update(aluno: Aluno): Promise<Aluno | null>;

    delete(idAluno: number): Promise<boolean>;

    findById(idAluno: number): Promise<Aluno | null>;

    findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: AlunoProps[]; total: number }>;

    existsByNome(nome: string): Promise<boolean>;

    existsById(idAluno: number): Promise<boolean>;
}
