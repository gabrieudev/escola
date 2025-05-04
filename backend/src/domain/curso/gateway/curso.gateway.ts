import { Curso, CursoProps } from "../entity/curso";

export interface CursoGateway {
    create(curso: Curso): Promise<Curso | null>;

    update(curso: Curso): Promise<Curso | null>;

    delete(idCurso: number): Promise<boolean>;

    existsByDescricao(descricao: string): Promise<boolean>;

    existsByIdInstituicao(idInstituicao: number): Promise<boolean>;

    existsByIdTipoCurso(idTipoCurso: number): Promise<boolean>;

    existsById(idCurso: number): Promise<boolean>;

    findById(idCurso: number): Promise<Curso | null>;

    findAll(
        descricao: string | null,
        idInstituicao: number | null,
        idTipoCurso: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: CursoProps[]; total: number }>;
}
