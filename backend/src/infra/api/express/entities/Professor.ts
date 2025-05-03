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
    idProfessor: number;

    @ManyToOne(() => Titulo)
    @JoinColumn({ name: "id_titulo" })
    titulo: Titulo;

    @Column({ name: "tx_nome", length: 50, unique: true })
    txNome: string;

    @Column({ name: "tx_sexo", length: 1, default: "m" })
    txSexo: "m" | "f";

    @Column({ name: "tx_estado_civil", length: 1, default: "s" })
    txEstadoCivil: "s" | "c" | "d";

    @Column({ name: "dt_nascimento", type: "date" })
    dtNascimento: Date;

    @Column({ name: "tx_telefone", length: 13, unique: true })
    txTelefone: string;
}
