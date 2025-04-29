import { Instituicao } from "../entity/instituicao";

export interface InstituicaoGateway {
    create(instituicao: Instituicao): Promise<Instituicao>;

    update(
        instituicao: Instituicao,
        id_instituicao: number
    ): Promise<Instituicao>;

    delete(id_instituicao: number): Promise<void>;

    findById(id_instituicao: number): Promise<Instituicao>;

    findAll(
        tx_sigla: string | null,
        page: number | null,
        limit: number | null
    ): Promise<Instituicao[]>;
}
