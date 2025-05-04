import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "tipo_curso" })
export class TipoCurso {
    @PrimaryGeneratedColumn({ name: "id_tipo_curso" })
    idTipoCurso: number | null;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    descricao: string;
}
