export type TipoDisciplinaProps = {
    id_tipo_disciplina: number | null;
    tx_descricao: string;
};

export class TipoDisciplina {
    private constructor(private props: TipoDisciplinaProps) {}

    public static create(
        id_tipo_disciplina: number | null,
        tx_descricao: string
    ) {
        return new TipoDisciplina({
            id_tipo_disciplina,
            tx_descricao,
        });
    }

    public update(tx_descricao: string) {
        this.props.tx_descricao = tx_descricao;
    }

    public static with(props: TipoDisciplinaProps) {
        return new TipoDisciplina(props);
    }

    public get id_tipo_disciplina() {
        return this.props.id_tipo_disciplina;
    }

    public get tx_descricao() {
        return this.props.tx_descricao;
    }
}
