export type CursaProps = {
    id_aluno: number;
    id_disciplina: number;
    in_ano: number;
    in_semestre: number;
    in_faltas: number;
    nm_nota1: number | null;
    nm_nota2: number | null;
    nm_nota3: number | null;
    bl_aprovado: boolean;
};

export class Cursa {
    constructor(public readonly props: CursaProps) {}

    static create(
        id_aluno: number,
        id_disciplina: number,
        in_ano: number,
        in_semestre: number,
        in_faltas: number
    ) {
        return new Cursa({
            id_aluno,
            id_disciplina,
            in_ano,
            in_semestre,
            in_faltas,
            nm_nota1: null,
            nm_nota2: null,
            nm_nota3: null,
            bl_aprovado: false,
        });
    }

    public update(nm_nota1: number, nm_nota2: number, nm_nota3: number) {
        this.props.nm_nota1 = nm_nota1;
        this.props.nm_nota2 = nm_nota2;
        this.props.nm_nota3 = nm_nota3;
    }

    public static with(props: CursaProps) {
        return new Cursa(props);
    }

    public get id_aluno() {
        return this.props.id_aluno;
    }

    public get id_disciplina() {
        return this.props.id_disciplina;
    }

    public get in_ano() {
        return this.props.in_ano;
    }

    public get in_semestre() {
        return this.props.in_semestre;
    }

    public get in_faltas() {
        return this.props.in_faltas;
    }

    public get nm_nota1() {
        return this.props.nm_nota1;
    }

    public get nm_nota2() {
        return this.props.nm_nota2;
    }

    public get nm_nota3() {
        return this.props.nm_nota3;
    }

    public get bl_aprovado() {
        return this.props.bl_aprovado;
    }
}
