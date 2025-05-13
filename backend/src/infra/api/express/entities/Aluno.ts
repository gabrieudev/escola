import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "escola", name: "aluno" })
export class Aluno {
    @PrimaryGeneratedColumn({ name: "id_aluno" })
    idAluno: number | null;

    @Column({ name: "tx_nome", length: 100, unique: true })
    nome: string;

    @Column({ name: "tx_sexo", length: 1 })
    sexo: string;

    @Column({ name: "dt_nascimento", type: "date" })
    dtNascimento: Date;

    update(nome: string, sexo: string, dtNascimento: Date): void {
        this.nome = nome;
        this.sexo = sexo;
        this.dtNascimento = dtNascimento;
    }
}
