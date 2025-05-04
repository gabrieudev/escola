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
            alunoEntity.nome = aluno.nome;
            alunoEntity.sexo = aluno.sexo;
            alunoEntity.dtNascimento = aluno.dtNascimento;

            const savedAluno = await this.repository.save(alunoEntity);

            return Aluno.create(
                savedAluno.idAluno,
                savedAluno.nome,
                savedAluno.sexo,
                savedAluno.dtNascimento
            );
        } catch (error) {
            return null;
        }
    }

    public async update(aluno: Aluno): Promise<Aluno | null> {
        try {
            const existingAluno = await this.repository.findOneBy({
                idAluno: aluno.idAluno ?? undefined,
            });

            if (!existingAluno) return null;

            existingAluno.nome = aluno.nome;
            existingAluno.sexo = aluno.sexo;
            existingAluno.dtNascimento = aluno.dtNascimento;

            const updatedAluno = await this.repository.save(existingAluno);

            return Aluno.create(
                updatedAluno.idAluno,
                updatedAluno.nome,
                updatedAluno.sexo,
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
            where: nome ? { nome: ILike(`%${nome}%`) } : {},
            skip: applyPagination ? (page - 1) * limit : undefined,
            take: applyPagination ? limit : undefined,
            order: { idAluno: "ASC" },
        });

        const alunos = alunosEntities.map((entity) => {
            const aluno = Aluno.create(
                entity.idAluno,
                entity.nome,
                entity.sexo,
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
            alunoEntity.nome,
            alunoEntity.sexo,
            alunoEntity.dtNascimento
        );
    }

    public async existsByNome(nome: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { nome },
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
