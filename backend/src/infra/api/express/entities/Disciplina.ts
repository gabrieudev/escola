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
    idDisciplina: number;

    @ManyToOne(() => Curso)
    @JoinColumn({ name: "id_curso" })
    curso: Curso;

    @ManyToOne(() => TipoDisciplina)
    @JoinColumn({ name: "id_tipo_disciplina" })
    tipoDisciplina: TipoDisciplina;

    @Column({ name: "tx_sigla", length: 10, unique: true })
    txSigla: string;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    txDescricao: string;

    @Column({ name: "in_periodo" })
    inPeriodo: number;

    @Column({ name: "in_carga_horaria" })
    inCargaHoraria: number;
}
