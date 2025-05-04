import { Titulo } from "../../titulo/entity/titulo";

export type ProfessorProps = {
    idProfessor: number | null;
    titulo: Titulo;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export class Professor {
    private constructor(private props: ProfessorProps) {}

    public static create(
        idProfessor: number | null,
        titulo: Titulo,
        nome: string,
        sexo: string,
        estadoCivil: string,
        dtNascimento: Date,
        telefone: string
    ) {
        return new Professor({
            idProfessor,
            titulo,
            nome,
            sexo,
            estadoCivil,
            dtNascimento,
            telefone,
        });
    }

    public update(
        nome: string,
        sexo: string,
        estadoCivil: string,
        dtNascimento: Date,
        telefone: string
    ) {
        this.props.nome = nome;
        this.props.sexo = sexo;
        this.props.estadoCivil = estadoCivil;
        this.props.dtNascimento = dtNascimento;
        this.props.telefone = telefone;
    }

    public static with(props: ProfessorProps) {
        return new Professor(props);
    }

    public toJSON() {
        return {
            idProfessor: this.props.idProfessor,
            titulo: this.props.titulo,
            nome: this.props.nome,
            sexo: this.props.sexo,
            estadoCivil: this.props.estadoCivil,
            dtNascimento: this.props.dtNascimento,
            telefone: this.props.telefone,
        };
    }

    public get idProfessor() {
        return this.props.idProfessor;
    }

    public get titulo() {
        return this.props.titulo;
    }

    public get nome() {
        return this.props.nome;
    }

    public get sexo() {
        return this.props.sexo;
    }

    public get estadoCivil() {
        return this.props.estadoCivil;
    }

    public get dtNascimento() {
        return this.props.dtNascimento;
    }

    public get telefone() {
        return this.props.telefone;
    }
}
