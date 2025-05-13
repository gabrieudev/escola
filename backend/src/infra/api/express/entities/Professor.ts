import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Titulo } from "./Titulo";

@Entity({ schema: "escola", name: "professor" })
export class Professor {
    @PrimaryGeneratedColumn({ name: "id_professor" })
    idProfessor: number | null;

    @ManyToOne(() => Titulo)
    @JoinColumn({ name: "id_titulo" })
    titulo: Titulo;

    @Column({ name: "tx_nome", length: 50, unique: true })
    nome: string;

    @Column({ name: "tx_sexo", length: 1, default: "m" })
    sexo: string;

    @Column({ name: "tx_estado_civil", length: 1, default: "s" })
    estadoCivil: string;

    @Column({ name: "dt_nascimento", type: "date" })
    dtNascimento: Date;

    @Column({ name: "tx_telefone", length: 13, unique: true })
    telefone: string;

    update(
        nome: string,
        sexo: string,
        estadoCivil: string,
        dtNascimento: Date,
        telefone: string
    ): void {
        this.nome = nome;
        this.sexo = sexo;
        this.estadoCivil = estadoCivil;
        this.dtNascimento = dtNascimento;
        this.telefone = telefone;
    }
}
