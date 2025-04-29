import { Titulo } from "../entity/titulo";

export interface TituloGateway {
    create(titulo: Titulo): Promise<Titulo>;

    update(titulo: Titulo, id_titulo: number): Promise<Titulo>;

    delete(id_titulo: number): Promise<void>;

    findById(id_titulo: number): Promise<Titulo>;

    findAll(
        tx_descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<Titulo[]>;
}
