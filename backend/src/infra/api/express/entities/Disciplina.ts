import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Curso } from "./Curso";
import { TipoDisciplina } from "./TipoDisciplina";

@Entity({ schema: "escola", name: "disciplina" })
export class Disciplina {
    @PrimaryGeneratedColumn({ name: "id_disciplina" })
    idDisciplina: number | null;

    @ManyToOne(() => Curso)
    @JoinColumn({ name: "id_curso" })
    curso: Curso;

    @ManyToOne(() => TipoDisciplina)
    @JoinColumn({ name: "id_tipo_disciplina" })
    tipoDisciplina: TipoDisciplina;

    @Column({ name: "tx_sigla", length: 10, unique: true })
    sigla: string;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    descricao: string;

    @Column({ name: "in_periodo" })
    periodo: number;

    @Column({ name: "in_carga_horaria" })
    cargaHoraria: number;

    update(
        sigla: string,
        descricao: string,
        periodo: number,
        cargaHoraria: number
    ) {
        this.sigla = sigla;
        this.descricao = descricao;
        this.periodo = periodo;
        this.cargaHoraria = cargaHoraria;
    }
}
