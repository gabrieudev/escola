export type LecionaProps = {
    id_disciplina: number;
    id_professor: number;
};

export class Leciona {
    private constructor(private props: LecionaProps) {}

    public static create(id_disciplina: number, id_professor: number) {
        return new Leciona({ id_disciplina, id_professor });
    }

    public static with(props: LecionaProps) {
        return new Leciona(props);
    }

    public get id_disciplina() {
        return this.props.id_disciplina;
    }

    public get id_professor() {
        return this.props.id_professor;
    }
}
