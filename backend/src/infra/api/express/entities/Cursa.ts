import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";

@Entity({ schema: "escola", name: "cursa" })
export class Cursa {
    @PrimaryColumn({ name: "id_aluno" })
    idAluno: number;

    @PrimaryColumn({ name: "id_disciplina" })
    idDisciplina: number;

    @PrimaryColumn({ name: "in_ano" })
    inAno: number;

    @PrimaryColumn({ name: "in_semestre" })
    inSemestre: number;

    @ManyToOne(() => Aluno)
    @JoinColumn({ name: "id_aluno" })
    aluno: Aluno;

    @ManyToOne(() => Disciplina)
    @JoinColumn({ name: "id_disciplina" })
    disciplina: Disciplina;

    @Column({ name: "in_faltas" })
    inFaltas: number;

    @Column({
        name: "nm_nota1",
        type: "numeric",
        precision: 4,
        scale: 2,
        nullable: true,
    })
    nmNota1: number;

    @Column({
        name: "nm_nota2",
        type: "numeric",
        precision: 4,
        scale: 2,
        nullable: true,
    })
    nmNota2: number;

    @Column({
        name: "nm_nota3",
        type: "numeric",
        precision: 4,
        scale: 2,
        nullable: true,
    })
    nmNota3: number;

    @Column({ name: "bl_aprovado", default: false })
    blAprovado: boolean;
}
