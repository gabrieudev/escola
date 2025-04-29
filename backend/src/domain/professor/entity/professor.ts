export type ProfessorProps = {
    id_professor: number | null;
    id_titulo: number;
    tx_nome: string;
    tx_sexo: string;
    tx_estado_civil: string;
    dt_nascimento: Date;
    tx_telefone: string;
};

export class Professor {
    private constructor(private props: ProfessorProps) {}

    public static create(
        id_professor: number | null,
        id_titulo: number,
        tx_nome: string,
        tx_sexo: string,
        tx_estado_civil: string,
        dt_nascimento: Date,
        tx_telefone: string
    ) {
        return new Professor({
            id_professor,
            id_titulo,
            tx_nome,
            tx_sexo,
            tx_estado_civil,
            dt_nascimento,
            tx_telefone,
        });
    }

    public update(
        tx_nome: string,
        tx_sexo: string,
        tx_estado_civil: string,
        dt_nascimento: Date,
        tx_telefone: string
    ) {
        this.props.tx_nome = tx_nome;
        this.props.tx_sexo = tx_sexo;
        this.props.tx_estado_civil = tx_estado_civil;
        this.props.dt_nascimento = dt_nascimento;
        this.props.tx_telefone = tx_telefone;
    }

    public static with(props: ProfessorProps) {
        return new Professor(props);
    }

    public get id_professor() {
        return this.props.id_professor;
    }

    public get id_titulo() {
        return this.props.id_titulo;
    }

    public get tx_nome() {
        return this.props.tx_nome;
    }

    public get tx_sexo() {
        return this.props.tx_sexo;
    }

    public get tx_estado_civil() {
        return this.props.tx_estado_civil;
    }

    public get dt_nascimento() {
        return this.props.dt_nascimento;
    }

    public get tx_telefone() {
        return this.props.tx_telefone;
    }
}
