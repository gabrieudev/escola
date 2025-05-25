import { DataSource, ILike, Repository } from "typeorm";
import { Titulo, TituloProps } from "../../../domain/titulo/entity/titulo";
import { TituloGateway } from "../../../domain/titulo/gateway/titulo.gateway";
import { Titulo as TituloEntity } from "../../api/express/entities/Titulo";

export class TituloRepository implements TituloGateway {
    constructor(private readonly repository: Repository<TituloEntity>) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(TituloEntity);
        return new TituloRepository(repository);
    }

    public async create(titulo: Titulo): Promise<Titulo | null> {
        try {
            const tituloEntity = new TituloEntity();
            tituloEntity.descricao = titulo.descricao;

            const result = await this.repository.save(tituloEntity);

            return Titulo.create(result.idTitulo, result.descricao);
        } catch (error) {
            return null;
        }
    }

    public async update(titulo: Titulo): Promise<Titulo | null> {
        try {
            const existingTitulo = await this.repository.findOneBy({
                idTitulo: titulo.idTitulo ?? undefined,
            });

            if (!existingTitulo) {
                return null;
            }

            existingTitulo.update(titulo.descricao);

            const result = await this.repository.save(existingTitulo);

            return Titulo.create(result.idTitulo, result.descricao);
        } catch (error) {
            return null;
        }
    }

    public async delete(idTitulo: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idTitulo);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findById(idTitulo: number): Promise<Titulo | null> {
        try {
            const result = await this.repository.findOneBy({
                idTitulo,
            });

            if (!result) {
                return null;
            }

            return Titulo.create(result.idTitulo, result.descricao);
        } catch (error) {
            return null;
        }
    }

    public async findAll(
        descricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ titulos: TituloProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [titulosEntities, total] = await this.repository.findAndCount({
            where: descricao ? { descricao: ILike(`%${descricao}%`) } : {},
            skip: applyPagination ? (page - 1) * limit : undefined,
            take: applyPagination ? limit : undefined,
            order: { idTitulo: "ASC" },
        });

        const titulos = titulosEntities.map((entity) => {
            const titulo = Titulo.create(entity.idTitulo, entity.descricao);
            return titulo.toJSON();
        });

        return { titulos: titulos, total };
    }

    public async existsByDescricao(descricao: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { descricao },
        });
        return count > 0;
    }

    public async existsById(idTitulo: number): Promise<boolean> {
        const count = await this.repository.count({
            where: { idTitulo },
        });
        return count > 0;
    }
}
