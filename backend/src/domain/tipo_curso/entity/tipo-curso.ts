export type TipoCursoProps = {
    id_tipo_curso: number | null;
    tx_descricao: string;
};

export class TipoCurso {
    private constructor(private props: TipoCursoProps) {}

    public static create(id_tipo_curso: number | null, tx_descricao: string) {
        return new TipoCurso({ id_tipo_curso, tx_descricao });
    }

    public update(tx_descricao: string) {
        this.props.tx_descricao = tx_descricao;
    }

    public static with(props: TipoCursoProps) {
        return new TipoCurso(props);
    }

    public get id_tipo_curso() {
        return this.props.id_tipo_curso;
    }

    public get tx_descricao() {
        return this.props.tx_descricao;
    }
}
