import { TipoCurso } from "../entity/tipo-curso";

export interface TipoCursoGateway {
    create(tipoCurso: TipoCurso): Promise<TipoCurso>;

    update(tipoCurso: TipoCurso): Promise<TipoCurso>;

    delete(id_tipo_curso: number): Promise<void>;

    findAll(
        tx_descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<TipoCurso[]>;

    findById(id_tipo_curso: number): Promise<TipoCurso>;
}
