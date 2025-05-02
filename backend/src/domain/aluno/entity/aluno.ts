export type AlunoProps = {
    id_aluno: number | null;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export class Aluno {
    private constructor(private props: AlunoProps) {}

    static create(
        id_aluno: number | null,
        tx_nome: string,
        tx_sexo: string,
        dt_nascimento: Date
    ) {
        return new Aluno({ id_aluno, tx_nome, tx_sexo, dt_nascimento });
    }

    public update(tx_nome: string, tx_sexo: string, dt_nascimento: Date) {
        this.props.tx_nome = tx_nome;
        this.props.tx_sexo = tx_sexo;
        this.props.dt_nascimento = dt_nascimento;
    }

    public with(props: AlunoProps) {
        return new Aluno(props);
    }

    toJSON(): AlunoProps {
        return {
            id_aluno: this.id_aluno,
            tx_nome: this.tx_nome,
            tx_sexo: this.tx_sexo,
            dt_nascimento: this.dt_nascimento,
        };
    }

    public get id_aluno() {
        return this.props.id_aluno;
    }

    public get tx_nome() {
        return this.props.tx_nome;
    }

    public get tx_sexo() {
        return this.props.tx_sexo;
    }

    public get dt_nascimento() {
        return this.props.dt_nascimento;
    }
}
