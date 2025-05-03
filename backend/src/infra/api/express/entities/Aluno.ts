import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "aluno" })
export class Aluno {
    @PrimaryGeneratedColumn({ name: "id_aluno" })
    idAluno: number;

    @Column({ name: "tx_nome", length: 100, unique: true })
    txNome: string;

    @Column({ name: "tx_sexo", length: 1 })
    txSexo: string;

    @Column({ name: "dt_nascimento", type: "date" })
    dtNascimento: Date;
}
