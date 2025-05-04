import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "tipo_disciplina" })
export class TipoDisciplina {
    @PrimaryGeneratedColumn({ name: "id_tipo_disciplina" })
    idTipoDisciplina: number | null;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    descricao: string;
}
