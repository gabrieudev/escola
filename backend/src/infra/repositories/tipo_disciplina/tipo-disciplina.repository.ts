import { DataSource, ILike, Repository } from "typeorm";
import {
    TipoDisciplina,
    TipoDisciplinaProps,
} from "../../../domain/tipo_disciplina/entity/tipo-disciplina";
import { TipoDisciplinaGateway } from "../../../domain/tipo_disciplina/gateway/tipo-disciplina.gateway";
import { TipoDisciplina as TipoDisciplinaEntity } from "../../api/express/entities/TipoDisciplina";

export class TipoDisciplinaRepository implements TipoDisciplinaGateway {
    constructor(
        private readonly repository: Repository<TipoDisciplinaEntity>
    ) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(TipoDisciplinaEntity);
        return new TipoDisciplinaRepository(repository);
    }

    public async create(
        tipoDisciplina: TipoDisciplina
    ): Promise<TipoDisciplina | null> {
        try {
            const tipoDisciplinaEntity = new TipoDisciplinaEntity();
            tipoDisciplinaEntity.idTipoDisciplina =
                tipoDisciplina.idTipoDisciplina;
            tipoDisciplinaEntity.descricao = tipoDisciplina.descricao;

            const savedTipoDisciplina = await this.repository.save(
                tipoDisciplinaEntity
            );

            return TipoDisciplina.create(
                savedTipoDisciplina.idTipoDisciplina,
                savedTipoDisciplina.descricao
            );
        } catch (error) {
            return null;
        }
    }

    public async update(
        tipoDisciplina: TipoDisciplina
    ): Promise<TipoDisciplina | null> {
        try {
            const existingTipoDisciplina = await this.repository.findOneBy({
                idTipoDisciplina: tipoDisciplina.idTipoDisciplina ?? undefined,
            });

            if (!existingTipoDisciplina) {
                return null;
            }

            existingTipoDisciplina.update(tipoDisciplina.descricao);

            const updatedTipoDisciplina = await this.repository.save(
                existingTipoDisciplina
            );

            return TipoDisciplina.create(
                updatedTipoDisciplina.idTipoDisciplina,
                updatedTipoDisciplina.descricao
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idTipoDisciplina: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idTipoDisciplina);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ tiposDisciplina: TipoDisciplinaProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [tiposDisciplinasEntities, total] =
            await this.repository.findAndCount({
                where: descricao ? { descricao: ILike(`%${descricao}%`) } : {},
                skip: applyPagination ? (page - 1) * limit : undefined,
                take: applyPagination ? limit : undefined,
                order: { idTipoDisciplina: "ASC" },
            });

        const tiposDisciplinas = tiposDisciplinasEntities.map((entity) => {
            const tipoDisciplina = TipoDisciplina.create(
                entity.idTipoDisciplina,
                entity.descricao
            );
            return tipoDisciplina.toJSON();
        });

        return { tiposDisciplina: tiposDisciplinas, total };
    }

    public async findById(
        idTipoDisciplina: number
    ): Promise<TipoDisciplina | null> {
        try {
            const entity = await this.repository.findOneBy({
                idTipoDisciplina: idTipoDisciplina,
            });

            return entity
                ? TipoDisciplina.create(
                      entity.idTipoDisciplina,
                      entity.descricao
                  )
                : null;
        } catch (error) {
            return null;
        }
    }

    public async existsById(idTipoDisciplina: number): Promise<boolean> {
        const count = await this.repository.count({
            where: { idTipoDisciplina },
        });
        return count > 0;
    }

    public async existsByDescricao(descricao: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { descricao },
        });
        return count > 0;
    }
}
