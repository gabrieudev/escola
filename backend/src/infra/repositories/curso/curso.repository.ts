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
        return null;
    }

    public async delete(idCurso: number): Promise<boolean> {
        return false;
    }

    public async findAll(
        txDescricao: string | null,
        page: number | null,
        limit: number | null
    ): Promise<{ data: CursoProps[]; total: number }> {
        return { data: [], total: 0 };
    }

    public async findById(idCurso: number): Promise<Curso | null> {
        return null;
    }

    public async existsByDescricao(txDescricao: string): Promise<boolean> {
        return false;
    }

    public async existsById(idCurso: number): Promise<boolean> {
        return false;
    }

    public async existsByIdInstituicao(
        idInstituicao: number
    ): Promise<boolean> {
        return false;
    }

    public async existsByIdTipoCurso(idTipoCurso: number): Promise<boolean> {
        return false;
    }
}
