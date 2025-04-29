import { Disciplina } from "../entity/disciplina";

export interface DisciplinaGateway {
    create(disciplina: Disciplina): Promise<Disciplina>;

    update(disciplina: Disciplina, id_disciplina: number): Promise<Disciplina>;

    delete(id_disciplina: number): Promise<void>;

    findById(id_disciplina: number): Promise<Disciplina>;

    findAll(
        id_curso: number | null,
        id_tipo_disciplina: number | null,
        tx_sigla: string | null,
        tx_descricao: string | null,
        in_periodo: number | null,
        page: number | null,
        limit: number | null
    ): Promise<Disciplina[]>;
}
