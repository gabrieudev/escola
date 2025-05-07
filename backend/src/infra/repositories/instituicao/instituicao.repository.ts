import { DataSource, ILike, Repository } from "typeorm";
import {
    Instituicao,
    InstituicaoProps,
} from "../../../domain/instituicao/entity/instituicao";
import { InstituicaoGateway } from "../../../domain/instituicao/gateway/instituicao.gateway";
import { Instituicao as InstituicaoEntity } from "../../api/express/entities/Instituicao";

export class InstituicaoRepository implements InstituicaoGateway {
    private constructor(
        private readonly repository: Repository<InstituicaoEntity>
    ) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(InstituicaoEntity);
        return new InstituicaoRepository(repository);
    }

    public async create(instituicao: Instituicao): Promise<Instituicao | null> {
        try {
            const instituicaoEntity = new InstituicaoEntity();
            instituicaoEntity.descricao = instituicao.descricao;
            instituicaoEntity.sigla = instituicao.sigla;

            const savedInstituicao = await this.repository.save(
                instituicaoEntity
            );

            return Instituicao.create(
                savedInstituicao.idInstituicao,
                savedInstituicao.descricao,
                savedInstituicao.sigla
            );
        } catch (error) {
            return null;
        }
    }

    public async update(instituicao: Instituicao): Promise<Instituicao | null> {
        try {
            const instituicaoEntity = new InstituicaoEntity();

            instituicaoEntity.update(instituicao.descricao, instituicao.sigla);

            const savedInstituicao = await this.repository.save(
                instituicaoEntity
            );

            return Instituicao.create(
                savedInstituicao.idInstituicao,
                savedInstituicao.descricao,
                savedInstituicao.sigla
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idInstituicao: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idInstituicao);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findById(idInstituicao: number): Promise<Instituicao | null> {
        try {
            const instituicaoEntity = await this.repository.findOneBy({
                idInstituicao,
            });

            if (!instituicaoEntity) return null;

            return Instituicao.create(
                instituicaoEntity.idInstituicao,
                instituicaoEntity.descricao,
                instituicaoEntity.sigla
            );
        } catch (error) {
            return null;
        }
    }

    public async findAll(
        sigla: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: InstituicaoProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [instituicoesEntities, total] =
            await this.repository.findAndCount({
                where: sigla ? { sigla: ILike(`%${sigla}%`) } : {},
                skip: applyPagination ? (page - 1) * limit : undefined,
                take: applyPagination ? limit : undefined,
                order: { idInstituicao: "ASC" },
            });

        const instituicoes = instituicoesEntities.map((entity) => {
            const instituicao = Instituicao.create(
                entity.idInstituicao,
                entity.descricao,
                entity.sigla
            );
            return instituicao.toJSON();
        });

        return { data: instituicoes, total };
    }

    public async existsById(idInstituicao: number): Promise<boolean> {
        try {
            const instituicaoEntity = await this.repository.findOneBy({
                idInstituicao,
            });
            return instituicaoEntity !== null;
        } catch (error) {
            return false;
        }
    }
}
