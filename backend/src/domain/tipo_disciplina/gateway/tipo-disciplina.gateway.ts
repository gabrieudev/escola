import { TipoDisciplina, TipoDisciplinaProps } from "../entity/tipo-disciplina";

export interface TipoDisciplinaGateway {
    create(tipoDisciplina: TipoDisciplina): Promise<TipoDisciplina | null>;

    update(tipoDisciplina: TipoDisciplina): Promise<TipoDisciplina | null>;

    delete(idTipoDisciplina: number): Promise<boolean>;

    findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: TipoDisciplinaProps[]; total: number }>;

    findById(idTipoDisciplina: number): Promise<TipoDisciplina | null>;

    existsById(idTipoDisciplina: number): Promise<boolean>;

    existsByDescricao(descricao: string): Promise<boolean>;
}
