export type TipoDisciplinaProps = {
    idTipoDisciplina: number | null;
    descricao: string;
};

export class TipoDisciplina {
    private constructor(private props: TipoDisciplinaProps) {}

    public static create(idTipoDisciplina: number | null, descricao: string) {
        return new TipoDisciplina({
            idTipoDisciplina,
            descricao,
        });
    }

    public update(descricao: string) {
        this.props.descricao = descricao;
    }

    public static with(props: TipoDisciplinaProps) {
        return new TipoDisciplina(props);
    }

    public toJSON() {
        return {
            idTipoDisciplina: this.props.idTipoDisciplina,
            descricao: this.props.descricao,
        };
    }

    public get idTipoDisciplina() {
        return this.props.idTipoDisciplina;
    }

    public get descricao() {
        return this.props.descricao;
    }
}
