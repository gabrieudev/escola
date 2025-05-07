import { DataSource, ILike, Repository } from "typeorm";
import {
    TipoCurso,
    TipoCursoProps,
} from "../../../domain/tipo_curso/entity/tipo-curso";
import { TipoCursoGateway } from "../../../domain/tipo_curso/gateway/tipo-curso.gateway";
import { TipoCurso as TipoCursoEntity } from "../../api/express/entities/TipoCurso";

export class TipoCursoRepository implements TipoCursoGateway {
    private constructor(
        private readonly repository: Repository<TipoCursoEntity>
    ) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(TipoCursoEntity);
        return new TipoCursoRepository(repository);
    }

    public async create(tipoCurso: TipoCurso): Promise<TipoCurso | null> {
        try {
            const tipoCursoEntity = new TipoCursoEntity();
            tipoCursoEntity.descricao = tipoCurso.descricao;

            const savedTipoCurso = await this.repository.save(tipoCursoEntity);

            return TipoCurso.create(
                savedTipoCurso.idTipoCurso,
                savedTipoCurso.descricao
            );
        } catch (error) {
            return null;
        }
    }

    public async update(tipoCurso: TipoCurso): Promise<TipoCurso | null> {
        try {
            const existingTipoCurso = await this.repository.findOneBy({
                idTipoCurso: tipoCurso.idTipoCurso ?? undefined,
            });

            if (!existingTipoCurso) return null;

            existingTipoCurso.descricao = tipoCurso.descricao;

            const updatedTipoCurso = await this.repository.save(
                existingTipoCurso
            );

            return TipoCurso.create(
                updatedTipoCurso.idTipoCurso,
                updatedTipoCurso.descricao
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idTipoCurso: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idTipoCurso);

            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: TipoCursoProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [tiposCursosEntities, total] = await this.repository.findAndCount(
            {
                where: descricao ? { descricao: ILike(`%${descricao}%`) } : {},
                skip: applyPagination ? (page - 1) * limit : undefined,
                take: applyPagination ? limit : undefined,
                order: { idTipoCurso: "ASC" },
            }
        );

        const tiposCursos = tiposCursosEntities.map((entity) => {
            const tipoCurso = TipoCurso.create(
                entity.idTipoCurso,
                entity.descricao
            );
            return tipoCurso.toJSON();
        });

        return { data: tiposCursos, total };
    }

    public async findById(idTipoCurso: number): Promise<TipoCurso | null> {
        try {
            const tipoCursoEntity = await this.repository.findOneBy({
                idTipoCurso,
            });

            if (!tipoCursoEntity) return null;

            return TipoCurso.create(
                tipoCursoEntity.idTipoCurso,
                tipoCursoEntity.descricao
            );
        } catch (error) {
            return null;
        }
    }

    public async existsByDescricao(descricao: string): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                descricao,
            });

            return !!result;
        } catch (error) {
            return false;
        }
    }

    public async existsById(idTipoCurso: number): Promise<boolean> {
        try {
            const result = await this.repository.findOneBy({
                idTipoCurso,
            });

            return !!result;
        } catch (error) {
            return false;
        }
    }
}
