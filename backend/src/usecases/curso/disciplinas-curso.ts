import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import { DisciplinaGateway } from "../../domain/disciplina/gateway/disciplina.gateway";
import { Usecase } from "../usecase";

export type DisciplinaCursoOutputDto = {
    curso: string;
    quantidade_disciplinas: number;
}[];

export class DisciplinaCursoUsecase
    implements Usecase<null, DisciplinaCursoOutputDto>
{
    constructor(
        private cursoGateway: CursoGateway,
        private disciplinaGateway: DisciplinaGateway
    ) {}

    static create(
        cursoGateway: CursoGateway,
        disciplinaGateway: DisciplinaGateway
    ): DisciplinaCursoUsecase {
        return new DisciplinaCursoUsecase(cursoGateway, disciplinaGateway);
    }

    async execute(): Promise<DisciplinaCursoOutputDto> {
        const cursos = await this.cursoGateway.findAll(
            null,
            null,
            null,
            null,
            null
        );
        return await Promise.all(
            cursos.data.map(async (curso) => {
                const disciplinas = await this.disciplinaGateway.findAll(
                    curso.idCurso,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                );
                return {
                    curso: curso.descricao,
                    quantidade_disciplinas: disciplinas.total,
                };
            })
        );
    }
}
