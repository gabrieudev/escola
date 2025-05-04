import { TipoCurso, TipoCursoProps } from "../entity/tipo-curso";

export interface TipoCursoGateway {
    create(tipoCurso: TipoCurso): Promise<TipoCurso | null>;

    update(tipoCurso: TipoCurso): Promise<TipoCurso | null>;

    delete(idTipoCurso: number): Promise<boolean>;

    findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: TipoCursoProps[]; total: number }>;

    findById(idTipoCurso: number): Promise<TipoCurso | null>;

    existsByDescricao(descricao: string): Promise<boolean>;

    existsById(idTipoCurso: number): Promise<boolean>;
}
