import { Titulo, TituloProps } from "../entity/titulo";

export interface TituloGateway {
    create(titulo: Titulo): Promise<Titulo | null>;

    update(titulo: Titulo): Promise<Titulo | null>;

    delete(idTitulo: number): Promise<boolean>;

    findById(idTitulo: number): Promise<Titulo | null>;

    findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: TituloProps[]; total: number }>;

    existsByDescricao(descricao: string): Promise<boolean>;

    existsById(idTitulo: number): Promise<boolean>;
}
