import { DataSource, ILike, Repository } from "typeorm";
import { Aluno, AlunoProps } from "../../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../../domain/aluno/gateway/aluno.gateway";
import { Aluno as AlunoEntity } from "../../api/express/entities/Aluno";

export class AlunoRepository implements AlunoGateway {
    private constructor(private readonly repository: Repository<AlunoEntity>) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(AlunoEntity);
        return new AlunoRepository(repository);
    }

    public async create(aluno: Aluno): Promise<Aluno | null> {
        try {
            const alunoEntity = new AlunoEntity();
            alunoEntity.txNome = aluno.tx_nome;
            alunoEntity.txSexo = aluno.tx_sexo;
            alunoEntity.dtNascimento = aluno.dt_nascimento;

            const savedAluno = await this.repository.save(alunoEntity);

            return Aluno.create(
                savedAluno.idAluno,
                savedAluno.txNome,
                savedAluno.txSexo,
                savedAluno.dtNascimento
            );
        } catch (error) {
            return null;
        }
    }

    public async update(aluno: Aluno): Promise<Aluno | null> {
        try {
            const existingAluno = await this.repository.findOneBy({
                idAluno: aluno.id_aluno ?? undefined,
            });

            if (!existingAluno) return null;

            existingAluno.txNome = aluno.tx_nome;
            existingAluno.txSexo = aluno.tx_sexo;
            existingAluno.dtNascimento = aluno.dt_nascimento;

            const updatedAluno = await this.repository.save(existingAluno);

            return Aluno.create(
                updatedAluno.idAluno,
                updatedAluno.txNome,
                updatedAluno.txSexo,
                updatedAluno.dtNascimento
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idAluno: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idAluno);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: AlunoProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [alunosEntities, total] = await this.repository.findAndCount({
            where: nome ? { txNome: ILike(`%${nome}%`) } : {},
            skip: applyPagination ? (page - 1) * limit : undefined,
            take: applyPagination ? limit : undefined,
            order: { idAluno: "ASC" },
        });

        const alunos = alunosEntities.map((entity) => {
            const aluno = Aluno.create(
                entity.idAluno,
                entity.txNome,
                entity.txSexo,
                entity.dtNascimento
            );
            return aluno.toJSON();
        });

        return { data: alunos, total };
    }

    public async findById(idAluno: number): Promise<Aluno | null> {
        const alunoEntity = await this.repository.findOneBy({
            idAluno,
        });

        if (!alunoEntity) return null;

        return Aluno.create(
            alunoEntity.idAluno,
            alunoEntity.txNome,
            alunoEntity.txSexo,
            alunoEntity.dtNascimento
        );
    }

    public async existsByNome(txNome: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { txNome },
        });
        return count > 0;
    }

    public async existsById(idAluno: number): Promise<boolean> {
        const count = await this.repository.count({
            where: { idAluno },
        });
        return count > 0;
    }
}
