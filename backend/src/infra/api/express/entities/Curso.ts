import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Instituicao } from "./Instituicao";
import { TipoCurso } from "./TipoCurso";

@Entity({ schema: "escola", name: "curso" })
export class Curso {
    @PrimaryGeneratedColumn({ name: "id_curso" })
    idCurso: number;

    @ManyToOne(() => Instituicao)
    @JoinColumn({ name: "id_instituicao" })
    instituicao: Instituicao;

    @ManyToOne(() => TipoCurso)
    @JoinColumn({ name: "id_tipo_curso" })
    tipoCurso: TipoCurso;

    @Column({ name: "tx_descricao", length: 150, unique: true })
    txDescricao: string;
}
