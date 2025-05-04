export type TituloProps = {
    idTitulo: number | null;
    descricao: string;
};

export class Titulo {
    private constructor(private props: TituloProps) {}

    public static create(idTitulo: number | null, descricao: string) {
        return new Titulo({
            idTitulo,
            descricao,
        });
    }

    public update(descricao: string) {
        this.props.descricao = descricao;
    }

    public static with(props: TituloProps) {
        return new Titulo(props);
    }

    public toJSON() {
        return {
            idTitulo: this.props.idTitulo,
            descricao: this.props.descricao,
        };
    }

    public get idTitulo() {
        return this.props.idTitulo;
    }

    public get descricao() {
        return this.props.descricao;
    }
}
