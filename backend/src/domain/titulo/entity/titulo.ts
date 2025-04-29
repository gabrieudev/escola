export type TituloProps = {
    id_titulo: number | null;
    tx_descricao: string;
};

export class Titulo {
    private constructor(private props: TituloProps) {}

    public static create(id_titulo: number | null, tx_descricao: string) {
        return new Titulo({
            id_titulo,
            tx_descricao,
        });
    }

    public update(tx_descricao: string) {
        this.props.tx_descricao = tx_descricao;
    }

    public static with(props: TituloProps) {
        return new Titulo(props);
    }

    public get id_titulo() {
        return this.props.id_titulo;
    }

    public get tx_descricao() {
        return this.props.tx_descricao;
    }
}
