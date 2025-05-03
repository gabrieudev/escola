import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Professor } from "./Professor";
import { Disciplina } from "./Disciplina";

@Entity({ schema: "escola", name: "leciona" })
export class Leciona {
    @PrimaryColumn({ name: "id_professor" })
    idProfessor: number;

    @PrimaryColumn({ name: "id_disciplina" })
    idDisciplina: number;

    @ManyToOne(() => Professor)
    @JoinColumn({ name: "id_professor" })
    professor: Professor;

    @ManyToOne(() => Disciplina)
    @JoinColumn({ name: "id_disciplina" })
    disciplina: Disciplina;
}
