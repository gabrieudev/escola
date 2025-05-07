import { DataSource, ILike, Repository } from "typeorm";
import {
    Professor,
    ProfessorProps,
} from "../../../domain/professor/entity/professor";
import { ProfessorGateway } from "../../../domain/professor/gateway/professor.gateway";
import { Professor as ProfessorEntity } from "../../api/express/entities/Professor";
import { Titulo } from "../../../domain/titulo/entity/titulo";

export class ProfessorRepository implements ProfessorGateway {
    constructor(private readonly repository: Repository<ProfessorEntity>) {}

    public static create(dataSource: DataSource) {
        const repository = dataSource.getRepository(ProfessorEntity);
        return new ProfessorRepository(repository);
    }

    public async create(professor: Professor): Promise<Professor | null> {
        try {
            const professorEntity = new ProfessorEntity();
            professorEntity.titulo = professor.titulo;
            professorEntity.nome = professor.nome;
            professorEntity.sexo = professor.sexo;
            professorEntity.estadoCivil = professor.estadoCivil;
            professorEntity.dtNascimento = professor.dtNascimento;
            professorEntity.telefone = professor.telefone;

            const result = await this.repository.save(professorEntity);

            return Professor.create(
                result.idProfessor,
                result.titulo as Titulo,
                result.nome,
                result.sexo,
                result.estadoCivil,
                result.dtNascimento,
                result.telefone
            );
        } catch (error) {
            return null;
        }
    }

    public async update(professor: Professor): Promise<Professor | null> {
        try {
            const existingProfessor = await this.repository.findOneBy({
                idProfessor: professor.idProfessor ?? undefined,
            });

            if (!existingProfessor) {
                return null;
            }

            existingProfessor.update(
                professor.nome,
                professor.sexo,
                professor.estadoCivil,
                professor.dtNascimento,
                professor.telefone
            );

            const result = await this.repository.save(existingProfessor);
            return Professor.create(
                result.idProfessor,
                result.titulo as Titulo,
                result.nome,
                result.sexo,
                result.estadoCivil,
                result.dtNascimento,
                result.telefone
            );
        } catch (error) {
            return null;
        }
    }

    public async delete(idProfessor: number): Promise<boolean> {
        try {
            const result = await this.repository.delete(idProfessor);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            return false;
        }
    }

    public async findById(idProfessor: number): Promise<Professor | null> {
        try {
            const result = await this.repository.findOneBy({
                idProfessor,
            });

            if (!result) {
                return null;
            }

            return Professor.create(
                result.idProfessor,
                result.titulo as Titulo,
                result.nome,
                result.sexo,
                result.estadoCivil,
                result.dtNascimento,
                result.telefone
            );
        } catch (error) {
            return null;
        }
    }

    public async findAll(
        nome: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: ProfessorProps[]; total: number }> {
        const applyPagination = page !== null && limit !== null;

        const [professoresEntities, total] = await this.repository.findAndCount(
            {
                where: nome ? { nome: ILike(`%${nome}%`) } : {},
                skip: applyPagination ? (page - 1) * limit : undefined,
                take: applyPagination ? limit : undefined,
                order: { idProfessor: "ASC" },
            }
        );

        const professores = professoresEntities.map((entity) => {
            const professor = Professor.create(
                entity.idProfessor,
                entity.titulo as Titulo,
                entity.nome,
                entity.sexo,
                entity.estadoCivil,
                entity.dtNascimento,
                entity.telefone
            );
            return professor.toJSON();
        });

        return { data: professores, total };
    }

    public async existsByNome(nome: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { nome },
        });
        return count > 0;
    }

    public async existsById(idProfessor: number): Promise<boolean> {
        const count = await this.repository.count({
            where: { idProfessor },
        });
        return count > 0;
    }

    public async existsByIdTitulo(idTitulo: number): Promise<boolean> {
        const count = await this.repository.count({
            where: { titulo: { idTitulo } },
        });
        return count > 0;
    }
}
