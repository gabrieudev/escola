import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "titulo" })
export class Titulo {
    @PrimaryGeneratedColumn({ name: "id_titulo" })
    idTitulo: number | null;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    descricao: string;

    update(descricao: string): void {
        this.descricao = descricao;
    }
}
