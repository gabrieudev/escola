export type AlunoProps = {
    idAluno: number | null;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class Aluno {
    private constructor(private props: AlunoProps) {}

    static create(
        idAluno: number | null,
        nome: string,
        sexo: string,
        dtNascimento: Date
    ) {
        return new Aluno({ idAluno, nome, sexo, dtNascimento });
    }

    public update(nome: string, sexo: string, dtNascimento: Date) {
        this.props.nome = nome;
        this.props.sexo = sexo;
        this.props.dtNascimento = dtNascimento;
    }

    public with(props: AlunoProps) {
        return new Aluno(props);
    }

    toJSON(): AlunoProps {
        return {
            idAluno: this.idAluno,
            nome: this.nome,
            sexo: this.sexo,
            dtNascimento: this.dtNascimento,
        };
    }

    public get idAluno() {
        return this.props.idAluno;
    }

    public get nome() {
        return this.props.nome;
    }

    public get sexo() {
        return this.props.sexo;
    }

    public get dtNascimento() {
        return this.props.dtNascimento;
    }
}
