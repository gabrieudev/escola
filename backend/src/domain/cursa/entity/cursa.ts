import { Aluno } from "../../aluno/entity/aluno";
import { Disciplina } from "../../disciplina/entity/disciplina";

export type CursaProps = {
    aluno: Aluno;
    disciplina: Disciplina;
    ano: number;
    semestre: number;
    faltas: number;
    nota1: number | null;
    nota2: number | null;
    nota3: number | null;
    isAprovado: boolean;
};

export class Cursa {
    constructor(public readonly props: CursaProps) {}

    static create(
        aluno: Aluno,
        disciplina: Disciplina,
        ano: number,
        semestre: number,
        faltas: number,
        nota1: number | null,
        nota2: number | null,
        nota3: number | null,
        isAprovado: boolean
    ) {
        return new Cursa({
            aluno,
            disciplina,
            ano,
            semestre,
            faltas,
            nota1,
            nota2,
            nota3,
            isAprovado,
        });
    }

    public update(
        nota1: number,
        nota2: number,
        nota3: number,
        faltas: number,
        isAprovado: boolean
    ) {
        this.props.nota1 = nota1;
        this.props.nota2 = nota2;
        this.props.nota3 = nota3;
        this.props.faltas = faltas;
        this.props.isAprovado = isAprovado;
    }

    public static with(props: CursaProps) {
        return new Cursa(props);
    }

    public toJSON() {
        return {
            aluno: this.props.aluno,
            disciplina: this.props.disciplina,
            ano: this.props.ano,
            semestre: this.props.semestre,
            faltas: this.props.faltas,
            nota1: this.props.nota1,
            nota2: this.props.nota2,
            nota3: this.props.nota3,
            isAprovado: this.props.isAprovado,
        };
    }

    public get aluno() {
        return this.props.aluno;
    }

    public get disciplina() {
        return this.props.disciplina;
    }

    public get ano() {
        return this.props.ano;
    }

    public get semestre() {
        return this.props.semestre;
    }

    public get faltas() {
        return this.props.faltas;
    }

    public get nota1() {
        return this.props.nota1;
    }

    public get nota2() {
        return this.props.nota2;
    }

    public get nota3() {
        return this.props.nota3;
    }

    public get isAprovado() {
        return this.props.isAprovado;
    }
}
