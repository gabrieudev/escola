import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";

@Entity({ schema: "escola", name: "cursa" })
export class Cursa {
    @PrimaryColumn({ name: "id_aluno" })
    idAluno: number | null;

    @PrimaryColumn({ name: "id_disciplina" })
    idDisciplina: number;

    @PrimaryColumn({ name: "in_ano" })
    ano: number;

    @PrimaryColumn({ name: "in_semestre" })
    semestre: number;

    @ManyToOne(() => Aluno)
    @JoinColumn({ name: "id_aluno" })
    aluno: Aluno;

    @ManyToOne(() => Disciplina)
    @JoinColumn({ name: "id_disciplina" })
    disciplina: Disciplina;

    @Column({ name: "in_faltas" })
    faltas: number;

    @Column({
        name: "nm_nota1",
        type: "numeric",
        precision: 4,
        scale: 2,
        nullable: true,
    })
    nota1: number | null;

    @Column({
        name: "nm_nota2",
        type: "numeric",
        precision: 4,
        scale: 2,
        nullable: true,
    })
    nota2: number | null;

    @Column({
        name: "nm_nota3",
        type: "numeric",
        precision: 4,
        scale: 2,
        nullable: true,
    })
    nota3: number | null;

    @Column({ name: "bl_aprovado", default: false })
    isAprovado: boolean;

    update(
        ano: number,
        semestre: number,
        faltas: number,
        nota1: number | null,
        nota2: number | null,
        nota3: number | null,
        isAprovado: boolean
    ): void {
        this.ano = ano;
        this.semestre = semestre;
        this.faltas = faltas;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.isAprovado = isAprovado;
    }
}
