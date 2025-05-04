export type InstituicaoProps = {
    idInstituicao: number | null;
    descricao: string;
    sigla: string;
};

export class Instituicao {
    private constructor(private props: InstituicaoProps) {}

    public static create(
        idInstituicao: number | null,
        descricao: string,
        sigla: string
    ) {
        return new Instituicao({
            idInstituicao,
            descricao,
            sigla,
        });
    }

    public update(descricao: string, sigla: string) {
        this.props.descricao = descricao;
        this.props.sigla = sigla;
    }

    public static with(props: InstituicaoProps) {
        return new Instituicao(props);
    }

    public toJSON() {
        return {
            idInstituicao: this.props.idInstituicao,
            descricao: this.props.descricao,
            sigla: this.props.sigla,
        };
    }

    public get idInstituicao() {
        return this.props.idInstituicao;
    }

    public get descricao() {
        return this.props.descricao;
    }

    public get sigla() {
        return this.props.sigla;
    }
}
