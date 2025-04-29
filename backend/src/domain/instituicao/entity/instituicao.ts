export type InstituicaoProps = {
    id_instituicao: number | null;
    tx_descricao: string;
    tx_sigla: string;
};

export class Instituicao {
    private constructor(private props: InstituicaoProps) {}

    public static create(
        id_instituicao: number | null,
        tx_descricao: string,
        tx_sigla: string
    ) {
        return new Instituicao({
            id_instituicao,
            tx_descricao,
            tx_sigla,
        });
    }

    public update(tx_descricao: string, tx_sigla: string) {
        this.props.tx_descricao = tx_descricao;
        this.props.tx_sigla = tx_sigla;
    }

    public static with(props: InstituicaoProps) {
        return new Instituicao(props);
    }

    public get id_instituicao() {
        return this.props.id_instituicao;
    }

    public get tx_descricao() {
        return this.props.tx_descricao;
    }

    public get tx_sigla() {
        return this.props.tx_sigla;
    }
}
