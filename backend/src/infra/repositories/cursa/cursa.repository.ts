import { DataSource, Repository } from "typeorm";
import { Aluno } from "../../../domain/aluno/entity/aluno";
import { Cursa, CursaProps } from "../../../domain/cursa/entity/cursa";
import { CursaGateway } from "../../../domain/cursa/gateway/cursa.gateway";
import { Disciplina } from "../../../domain/disciplina/entity/disciplina";
import { Cursa as CursaEntity } from "../../api/express/entities/Cursa";

export class CursaRepository implements CursaGateway {
    private constructor(private readonly repository: Repository<CursaEntity>) {}

    public static create(dataSource: DataSource) {
        return new CursaRepository(dataSource.getRepository(CursaEntity));
    }

    public async create(cursa: Cursa): Promise<Cursa | null> {
        try {
            const cursaEntity = new CursaEntity();
            cursaEntity.aluno = cursa.aluno;
            cursaEntity.disciplina = cursa.disciplina;
            cursaEntity.ano = cursa.ano;
            cursaEntity.semestre = cursa.semestre;
            cursaEntity.faltas = cursa.faltas;

            const savedCursa = await this.repository.save(cursaEntity);

            return Cursa.create(
                savedCursa.aluno as Aluno,
                savedCursa.disciplina as Disciplina,
                savedCursa.ano,
                savedCursa.semestre,
                savedCursa.faltas,
                savedCursa.nota1,
                savedCursa.nota2,
                savedCursa.nota3,
                savedCursa.isAprovado
            );
        } catch (error) {
            return null;
        }
    }

    public async update(cursa: Cursa): Promise<Cursa | null> {
        try {
            const cursaEntity = await this.repository.findOneBy({
                aluno: { idAluno: cursa.aluno.idAluno ?? undefined },
                disciplina: {
                    idDisciplina: cursa.disciplina.idDisciplina ?? undefined,
                },
            });

            if (!cursaEntity) return null;

            cursaEntity.update(
                cursa.ano,
                cursa.semestre,
                cursa.faltas,
                cursa.nota1,
                cursa.nota2,
                cursa.nota3,
                cursa.isAprovado
            );

            const savedCursa = await this.repository.save(cursaEntity);

            return Cursa.create(
                savedCursa.aluno as Aluno,
                savedCursa.disciplina as Disciplina,
                savedCursa.ano,
                savedCursa.semestre,
                savedCursa.faltas,
                savedCursa.nota1,
                savedCursa.nota2,
                savedCursa.nota3,
                savedCursa.isAprovado
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idCursa: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idCursa);

            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findById(
        idAluno: number,
        idDisciplina: number
    ): Promise<Cursa | null> {
        try {
            const cursaEntity = await this.repository.findOneBy({
                aluno: { idAluno },
                disciplina: { idDisciplina },
            });

            if (!cursaEntity) return null;

            return Cursa.create(
                cursaEntity.aluno as Aluno,
                cursaEntity.disciplina as Disciplina,
                cursaEntity.ano,
                cursaEntity.semestre,
                cursaEntity.faltas,
                cursaEntity.nota1,
                cursaEntity.nota2,
                cursaEntity.nota3,
                cursaEntity.isAprovado
            );
        } catch (error) {
            return null;
        }
    }

    public async findAll(
        idAluno: number | null,
        idDisciplina: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: CursaProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [cursasEntities, total] = await this.repository.findAndCount({
            where:
                idAluno && idDisciplina
                    ? { aluno: { idAluno }, disciplina: { idDisciplina } }
                    : idAluno
                    ? { aluno: { idAluno } }
                    : idDisciplina
                    ? { disciplina: { idDisciplina } }
                    : undefined,
            skip: applyPagination ? (page - 1) * limit : undefined,
            take: applyPagination ? limit : undefined,
        });

        const cursas = cursasEntities.map((entity) => {
            const cursa = Cursa.create(
                entity.aluno as Aluno,
                entity.disciplina as Disciplina,
                entity.ano,
                entity.semestre,
                entity.faltas,
                entity.nota1,
                entity.nota2,
                entity.nota3,
                entity.isAprovado
            );
            return cursa.toJSON();
        });

        return { data: cursas, total };
    }

    public async existsByIdAlunoAndIdDisciplina(
        idAluno: number,
        idDisciplina: number
    ): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                aluno: { idAluno },
                disciplina: { idDisciplina },
            },
        });
        return count > 0;
    }

    public async existsByIdAluno(idAluno: number): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                aluno: { idAluno },
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
}
