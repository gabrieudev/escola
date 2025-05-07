import { DataSource, ILike, Repository } from "typeorm";
import { Leciona, LecionaProps } from "../../../domain/leciona/entity/leciona";
import { LecionaGateway } from "../../../domain/leciona/gateway/leciona.gateway";
import { Leciona as LecionaEntity } from "../../api/express/entities/Leciona";
import { Disciplina } from "../../../domain/disciplina/entity/disciplina";
import { Professor } from "../../../domain/professor/entity/professor";

export class LecionaRepository implements LecionaGateway {
    private constructor(
        private readonly repository: Repository<LecionaEntity>
    ) {}

    static create(dataSource: DataSource) {
        return new LecionaRepository(dataSource.getRepository(LecionaEntity));
    }

    public async create(leciona: Leciona): Promise<Leciona | null> {
        try {
            const lecionaEntity = new LecionaEntity();
            lecionaEntity.disciplina = leciona.disciplina;
            lecionaEntity.professor = leciona.professor;

            const savedLeciona = await this.repository.save(lecionaEntity);

            return Leciona.create(
                savedLeciona.disciplina as Disciplina,
                savedLeciona.professor as Professor
            );
        } catch (error) {
            return null;
        }
    }

    public async existsByIdDisciplinaAndIdProfessor(
        idDisciplina: number,
        idProfessor: number
    ): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                disciplina: { idDisciplina },
                professor: { idProfessor },
            },
        });
        return count > 0;
    }

    public async existsByIdDisciplina(idDisciplina: number): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                disciplina: { idDisciplina },
            },
        });
        return count > 0;
    }

    public async existsByIdProfessor(idProfessor: number): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                professor: { idProfessor },
            },
        });
        return count > 0;
    }
}
