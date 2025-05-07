import { DataSource, ILike, Repository } from "typeorm";
import { Curso, CursoProps } from "../../../domain/curso/entity/curso";
import { CursoGateway } from "../../../domain/curso/gateway/curso.gateway";
import { Curso as CursoEntity } from "../../api/express/entities/Curso";
import { Instituicao } from "../../../domain/instituicao/entity/instituicao";
import { TipoCurso } from "../../../domain/tipo_curso/entity/tipo-curso";

export class CursoRepository implements CursoGateway {
    private constructor(private readonly repository: Repository<CursoEntity>) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(CursoEntity);
        return new CursoRepository(repository);
    }

    public async create(curso: Curso): Promise<Curso | null> {
        try {
            const cursoEntity = new CursoEntity();
            cursoEntity.descricao = curso.descricao;
            cursoEntity.instituicao = curso.instituicao;
            cursoEntity.tipoCurso = curso.tipoCurso;

            const savedCurso = await this.repository.save(cursoEntity);

            return Curso.create(
                savedCurso.idCurso,
                savedCurso.descricao,
                savedCurso.instituicao as Instituicao,
                savedCurso.tipoCurso as TipoCurso
            );
        } catch (error) {
            return null;
        }
    }

    public async update(curso: Curso): Promise<Curso | null> {
        try {
            const existingCurso = await this.repository.findOneBy({
                idCurso: curso.idCurso ?? undefined,
            });

            if (!existingCurso) return null;

            existingCurso.update(curso.descricao);

            const updatedCurso = await this.repository.save(existingCurso);

            return Curso.create(
                updatedCurso.idCurso,
                updatedCurso.descricao,
                updatedCurso.instituicao as Instituicao,
                updatedCurso.tipoCurso as TipoCurso
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idCurso: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idCurso);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findAll(
        descricao: string | null,
        idInstituicao: number | null,
        idTipoCurso: number | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: CursoProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [cursosEntities, total] = await this.repository.findAndCount({
            where: {
                descricao: descricao ? ILike(`%${descricao}%`) : undefined,
                instituicao: idInstituicao
                    ? { idInstituicao: idInstituicao }
                    : undefined,
                tipoCurso: idTipoCurso
                    ? { idTipoCurso: idTipoCurso }
                    : undefined,
            },
            skip: applyPagination ? (page - 1) * limit : undefined,
            take: applyPagination ? limit : undefined,
            order: { idCurso: "ASC" },
        });

        const cursos = cursosEntities.map((entity) => {
            const curso = Curso.create(
                entity.idCurso,
                entity.descricao,
                entity.instituicao as Instituicao,
                entity.tipoCurso as TipoCurso
            );
            return curso.toJSON();
        });

        return { data: cursos, total };
    }

    public async findById(idCurso: number): Promise<Curso | null> {
        try {
            const cursoEntity = await this.repository.findOneBy({
                idCurso,
            });

            if (!cursoEntity) return null;

            return Curso.create(
                cursoEntity.idCurso,
                cursoEntity.descricao,
                cursoEntity.instituicao as Instituicao,
                cursoEntity.tipoCurso as TipoCurso
            );
        } catch (error) {
            return null;
        }
    }

    public async existsByDescricao(txDescricao: string): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                descricao: txDescricao,
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }

    public async existsById(idCurso: number): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                idCurso,
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }

    public async existsByIdInstituicao(
        idInstituicao: number
    ): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                instituicao: { idInstituicao },
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }

    public async existsByIdTipoCurso(idTipoCurso: number): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                tipoCurso: { idTipoCurso },
            });
            return !!result;
        } catch (error) {
            return false;
        }
    }
}
