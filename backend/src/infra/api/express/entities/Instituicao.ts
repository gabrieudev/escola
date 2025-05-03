import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "instituicao" })
export class Instituicao {
    @PrimaryGeneratedColumn({ name: "id_instituicao" })
    idInstituicao: number;

    @Column({ name: "tx_sigla", length: 15, unique: true })
    txSigla: string;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    txDescricao: string;
}
