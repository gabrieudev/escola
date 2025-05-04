import { Instituicao } from "../entity/instituicao";

export interface InstituicaoGateway {
    create(instituicao: Instituicao): Promise<Instituicao | null>;

    update(instituicao: Instituicao): Promise<Instituicao | null>;

    delete(idInstituicao: number): Promise<boolean>;

    findById(idInstituicao: number): Promise<Instituicao | null>;

    findAll(
        sigla: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: Instituicao[]; total: number }>;
}
