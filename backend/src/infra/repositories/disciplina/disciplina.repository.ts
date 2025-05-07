import { DataSource, ILike, Repository } from "typeorm";
import {
    Disciplina,
    DisciplinaProps,
} from "../../../domain/disciplina/entity/disciplina";
import { DisciplinaGateway } from "../../../domain/disciplina/gateway/disciplina.gateway";
import { Disciplina as DisciplinaEntity } from "../../api/express/entities/Disciplina";
import { Curso } from "../../../domain/curso/entity/curso";
import { TipoDisciplina } from "../../../domain/tipo_disciplina/entity/tipo-disciplina";

export class DisciplinaRepository implements DisciplinaGateway {
    private constructor(
        private readonly repository: Repository<DisciplinaEntity>
    ) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(DisciplinaEntity);
        return new DisciplinaRepository(repository);
    }

    public async create(disciplina: Disciplina): Promise<Disciplina | null> {
        try {
            const disciplinaEntity = this.repository.create({
                idDisciplina: disciplina.idDisciplina,
                curso: disciplina.curso,
                tipoDisciplina: disciplina.tipoDisciplina,
                sigla: disciplina.sigla,
                descricao: disciplina.descricao,
                periodo: disciplina.periodo,
                cargaHoraria: disciplina.cargaHoraria,
            });

            const createdDisciplina = await this.repository.save(
                disciplinaEntity
            );

            return Disciplina.create(
                createdDisciplina.idDisciplina,
                createdDisciplina.curso as Curso,
                createdDisciplina.tipoDisciplina as TipoDisciplina,
                createdDisciplina.sigla,
                createdDisciplina.descricao,
                createdDisciplina.periodo,
                createdDisciplina.cargaHoraria
            );
        } catch (error) {
            return null;
        }
    }

    public async update(disciplina: Disciplina): Promise<Disciplina | null> {
        try {
            const existingDisciplina = await this.repository.findOneBy({
                idDisciplina: disciplina.idDisciplina ?? undefined,
            });

            if (!existingDisciplina) return null;

            existingDisciplina.update(
                disciplina.sigla,
                disciplina.descricao,
                disciplina.periodo,
                disciplina.cargaHoraria
            );

            const updatedDisciplina = await this.repository.save(
                existingDisciplina
            );

            return Disciplina.create(
                updatedDisciplina.idDisciplina,
                updatedDisciplina.curso as Curso,
                updatedDisciplina.tipoDisciplina as TipoDisciplina,
                updatedDisciplina.sigla,
                updatedDisciplina.descricao,
                updatedDisciplina.periodo,
                updatedDisciplina.cargaHoraria
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idDisciplina: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idDisciplina);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findById(idDisciplina: number): Promise<Disciplina | null> {
        try {
            const disciplinaEntity = await this.repository.findOneBy({
                idDisciplina,
            });

            if (!disciplinaEntity) return null;

            return Disciplina.create(
                disciplinaEntity.idDisciplina,
                disciplinaEntity.curso as Curso,
                disciplinaEntity.tipoDisciplina as TipoDisciplina,
                disciplinaEntity.sigla,
                disciplinaEntity.descricao,
                disciplinaEntity.periodo,
                disciplinaEntity.cargaHoraria
            );
        } catch (error) {
            return null;
        }
    }

    public async findAll(
        idCurso: number | null,
        idTipoDisciplina: number | null,
        sigla: string | null,
        descricao: string | null,
        periodo: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: DisciplinaProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [disciplinasEntities, total] = await this.repository.findAndCount(
            {
                where: {
                    curso: idCurso ? { idCurso: idCurso } : undefined,
                    tipoDisciplina: idTipoDisciplina
                        ? { idTipoDisciplina: idTipoDisciplina }
                        : undefined,
                    sigla: sigla ? ILike(`%${sigla}%`) : undefined,
                    descricao: descricao ? ILike(`%${descricao}%`) : undefined,
                    periodo: periodo ? periodo : undefined,
                },
                skip: applyPagination ? (page - 1) * limit : undefined,
                take: applyPagination ? limit : undefined,
                order: { idDisciplina: "ASC" },
            }
        );

        const disciplinas = disciplinasEntities.map((entity) => {
            const disciplina = Disciplina.create(
                entity.idDisciplina,
                entity.curso as Curso,
                entity.tipoDisciplina as TipoDisciplina,
                entity.sigla,
                entity.descricao,
                entity.periodo,
                entity.cargaHoraria
            );
            return disciplina.toJSON();
        });

        return { data: disciplinas, total };
    }

    public async existsById(idDisciplina: number): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                idDisciplina,
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }

    public async existsByIdCurso(idCurso: number): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                curso: { idCurso },
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }

    public async existsByIdTipoDisciplina(
        idTipoDisciplina: number
    ): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                tipoDisciplina: { idTipoDisciplina },
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }
}
