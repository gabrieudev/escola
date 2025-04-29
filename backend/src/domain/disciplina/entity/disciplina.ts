export type DisciplinaProps = {
    id_disciplina: number | null;
    id_curso: number;
    id_tipo_disciplina: number;
    tx_sigla: string;
    tx_descricao: string;
    in_periodo: number;
    in_carga_horaria: number;
};

export class Disciplina {
    private constructor(private props: DisciplinaProps) {}

    public create(
        id_disciplina: number | null,
        id_curso: number,
        id_tipo_disciplina: number,
        tx_sigla: string,
        tx_descricao: string,
        in_periodo: number,
        in_carga_horaria: number
    ) {
        return new Disciplina({
            id_disciplina,
            id_curso,
            id_tipo_disciplina,
            tx_sigla,
            tx_descricao,
            in_periodo,
            in_carga_horaria,
        });
    }

    public update(
        tx_sigla: string,
        tx_descricao: string,
        in_periodo: number,
        in_carga_horaria: number
    ) {
        this.props.tx_sigla = tx_sigla;
        this.props.tx_descricao = tx_descricao;
        this.props.in_periodo = in_periodo;
        this.props.in_carga_horaria = in_carga_horaria;
    }

    public static with(props: DisciplinaProps) {
        return new Disciplina(props);
    }

    public get id_disciplina() {
        return this.props.id_disciplina;
    }

    public get id_curso() {
        return this.props.id_curso;
    }

    public get id_tipo_disciplina() {
        return this.props.id_tipo_disciplina;
    }

    public get tx_sigla() {
        return this.props.tx_sigla;
    }

    public get tx_descricao() {
        return this.props.tx_descricao;
    }

    public get in_periodo() {
        return this.props.in_periodo;
    }

    public get in_carga_horaria() {
        return this.props.in_carga_horaria;
    }
}
