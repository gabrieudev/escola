import { TipoDisciplina } from "../entity/tipo-disciplina";

export interface TipoDisciplinaGateway {
    create(tipoDisciplina: TipoDisciplina): Promise<TipoDisciplina | null>;

    update(tipoDisciplina: TipoDisciplina): Promise<TipoDisciplina | null>;

    delete(idTipoDisciplina: number): Promise<boolean>;

    findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: TipoDisciplina[]; total: number }>;

    findById(idTipoDisciplina: number): Promise<TipoDisciplina | null>;
}
