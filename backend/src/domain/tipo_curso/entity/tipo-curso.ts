export type TipoCursoProps = {
    idTipoCurso: number | null;
    descricao: string;
};

export class TipoCurso {
    private constructor(private props: TipoCursoProps) {}

    public static create(idTipoCurso: number | null, descricao: string) {
        return new TipoCurso({ idTipoCurso, descricao });
    }

    public update(descricao: string) {
        this.props.descricao = descricao;
    }

    public static with(props: TipoCursoProps) {
        return new TipoCurso(props);
    }

    public toJSON() {
        return {
            idTipoCurso: this.props.idTipoCurso,
            descricao: this.props.descricao,
        };
    }

    public get idTipoCurso() {
        return this.props.idTipoCurso;
    }

    public get descricao() {
        return this.props.descricao;
    }
}
