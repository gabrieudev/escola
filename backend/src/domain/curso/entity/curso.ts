import { Instituicao } from "../../instituicao/entity/instituicao";
import { TipoCurso } from "../../tipo_curso/entity/tipo-curso";

export type CursoProps = {
    idCurso: number | null;
    descricao: string;
    instituicao: Instituicao;
    tipoCurso: TipoCurso;
};

export class Curso {
    private constructor(private props: CursoProps) {}

    static create(
        idCurso: number | null,
        descricao: string,
        instituicao: Instituicao,
        tipoCurso: TipoCurso
    ) {
        return new Curso({
            idCurso,
            descricao,
            instituicao,
            tipoCurso,
        });
    }

    update(descricao: string) {
        this.props.descricao = descricao;
    }

    with(props: CursoProps) {
        return new Curso(props);
    }

    toJSON() {
        return {
            idCurso: this.props.idCurso,
            descricao: this.props.descricao,
            instituicao: this.props.instituicao,
            tipoCurso: this.props.tipoCurso,
        };
    }

    public get idCurso() {
        return this.props.idCurso;
    }

    public get descricao() {
        return this.props.descricao;
    }

    public get instituicao() {
        return this.props.instituicao;
    }

    public get tipoCurso() {
        return this.props.tipoCurso;
    }
}
