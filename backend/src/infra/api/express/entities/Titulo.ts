import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "titulo" })
export class Titulo {
    @PrimaryGeneratedColumn({ name: "id_titulo" })
    idTitulo: number;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    txDescricao: string;
}
