import { Disciplina } from "../../disciplina/entity/disciplina";
import { Professor } from "../../professor/entity/professor";

export type LecionaProps = {
    disciplina: Disciplina;
    professor: Professor;
};

export class Leciona {
    private constructor(private props: LecionaProps) {}

    public static create(disciplina: Disciplina, professor: Professor) {
        return new Leciona({ disciplina, professor });
    }

    public static with(props: LecionaProps) {
        return new Leciona(props);
    }

    public toJSON() {
        return {
            disciplina: this.props.disciplina,
            professor: this.props.professor,
        };
    }

    public get disciplina() {
        return this.props.disciplina;
    }

    public get professor() {
        return this.props.professor;
    }
}
