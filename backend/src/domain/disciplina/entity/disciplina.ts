import { Curso } from "../../curso/entity/curso";
import { TipoDisciplina } from "../../tipo_disciplina/entity/tipo-disciplina";

export type DisciplinaProps = {
    idDisciplina: number | null;
    curso: Curso;
    tipoDisciplina: TipoDisciplina;
    sigla: string;
    descricao: string;
    periodo: number;
    cargaHoraria: number;
};

export class Disciplina {
    private constructor(private props: DisciplinaProps) {}

    public static create(
        idDisciplina: number | null,
        curso: Curso,
        tipoDisciplina: TipoDisciplina,
        sigla: string,
        descricao: string,
        periodo: number,
        cargaHoraria: number
    ) {
        return new Disciplina({
            idDisciplina,
            curso,
            tipoDisciplina,
            sigla,
            descricao,
            periodo,
            cargaHoraria,
        });
    }

    public update(
        sigla: string,
        descricao: string,
        periodo: number,
        cargaHoraria: number
    ) {
        this.props.sigla = sigla;
        this.props.descricao = descricao;
        this.props.periodo = periodo;
        this.props.cargaHoraria = cargaHoraria;
    }

    public static with(props: DisciplinaProps) {
        return new Disciplina(props);
    }

    public toJSON() {
        return {
            idDisciplina: this.props.idDisciplina,
            curso: this.props.curso,
            tipoDisciplina: this.props.tipoDisciplina,
            sigla: this.props.sigla,
            descricao: this.props.descricao,
            periodo: this.props.periodo,
            cargaHoraria: this.props.cargaHoraria,
        };
    }

    public get idDisciplina() {
        return this.props.idDisciplina;
    }

    public get curso() {
        return this.props.curso;
    }

    public get tipoDisciplina() {
        return this.props.tipoDisciplina;
    }

    public get sigla() {
        return this.props.sigla;
    }

    public get descricao() {
        return this.props.descricao;
    }

    public get periodo() {
        return this.props.periodo;
    }

    public get cargaHoraria() {
        return this.props.cargaHoraria;
    }
}
