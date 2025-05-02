import { Prisma, PrismaClient } from "@prisma/client";
import { Aluno, AlunoProps } from "../../../domain/aluno/entity/aluno";
import { AlunoGateway } from "../../../domain/aluno/gateway/aluno.gateway";

export class AlunoRepositoryPrisma implements AlunoGateway {
    private constructor(private readonly prisma: PrismaClient) {}

    public static create(prisma: PrismaClient) {
        return new AlunoRepositoryPrisma(prisma);
    }

    public async create(aluno: Aluno): Promise<Aluno | null> {
        const data = {
            tx_nome: aluno.tx_nome,
            tx_sexo: aluno.tx_sexo,
            dt_nascimento: aluno.dt_nascimento,
        };

        const createdAluno = await this.prisma.aluno.create({
            data,
        });

        if (!createdAluno) {
            return null;
        }

        return aluno.with({
            ...createdAluno,
            id_aluno: createdAluno.id_aluno,
        });
    }

    public async update(aluno: Aluno): Promise<Aluno | null> {
        const updatedAluno = await this.prisma.aluno.update({
            where: {
                id_aluno: aluno.id_aluno!,
            },
            data: {
                tx_nome: aluno.tx_nome,
                tx_sexo: aluno.tx_sexo,
                dt_nascimento: aluno.dt_nascimento,
            },
        });

        if (!updatedAluno) {
            return null;
        }

        return aluno.with({
            ...updatedAluno,
            id_aluno: updatedAluno.id_aluno,
        });
    }

    public async delete(id_aluno: number): Promise<boolean> {
        const deletedAluno = await this.prisma.aluno.delete({
            where: {
                id_aluno,
            },
        });

        return !!deletedAluno;
    }

    public async findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: AlunoProps[]; total: number }> {
        const where = nome
            ? {
                  tx_nome: {
                      contains: nome,
                      mode: "insensitive" as Prisma.QueryMode,
                  },
              }
            : {};

        const applyPagination = page !== null && limit !== null;

        const [data, total] = await Promise.all([
            this.prisma.aluno.findMany({
                where,
                skip: applyPagination ? (page - 1) * limit : undefined,
                take: applyPagination ? limit : undefined,
                orderBy: { id_aluno: "asc" },
            }),
            this.prisma.aluno.count({ where }),
        ]);

        const alunos = data.map((alunoPrisma) => {
            const aluno = Aluno.create(
                alunoPrisma.id_aluno!,
                alunoPrisma.tx_nome,
                alunoPrisma.tx_sexo,
                alunoPrisma.dt_nascimento
            );
            return aluno.toJSON();
        });

        return { data: alunos, total };
    }

    public async findById(id_aluno: number): Promise<Aluno | null> {
        const aluno = await this.prisma.aluno.findUnique({
            where: {
                id_aluno,
            },
        });

        if (!aluno) {
            return null;
        }

        return Aluno.create(
            aluno.id_aluno!,
            aluno.tx_nome,
            aluno.tx_sexo,
            aluno.dt_nascimento
        );
    }

    public async existsByNome(tx_nome: string): Promise<boolean> {
        const aluno = await this.prisma.aluno.findFirst({
            where: {
                tx_nome,
            },
        });

        return !!aluno;
    }

    public async existsById(id_aluno: number): Promise<boolean> {
        const aluno = await this.prisma.aluno.findFirst({
            where: {
                id_aluno,
            },
        });

        return !!aluno;
    }
}
