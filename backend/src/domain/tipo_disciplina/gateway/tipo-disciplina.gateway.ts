import { TipoDisciplina } from "../entity/tipo-disciplina";

export interface TipoDisciplinaGateway {
    create(tipoDisciplina: TipoDisciplina): Promise<TipoDisciplina>;

    update(
        tipoDisciplina: TipoDisciplina,
        id_tipo_disciplina: number
    ): Promise<TipoDisciplina>;

    delete(id_tipo_disciplina: number): Promise<void>;

    findAll(
        tx_descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<TipoDisciplina[]>;

    findById(id_tipo_disciplina: number): Promise<TipoDisciplina>;
}
