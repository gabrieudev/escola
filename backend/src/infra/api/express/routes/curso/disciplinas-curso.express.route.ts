import { Request, Response } from "express";
import {
    DisciplinaCursoOutputDto,
    DisciplinaCursoUsecase,
} from "../../../../../usecases/curso/disciplinas-curso";
import { HttpMethod, Route } from "../route";

export class DisciplinasCursoRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly disciplinasCursoService: DisciplinaCursoUsecase
    ) {}

    public static create(
        disciplinasCursoService: DisciplinaCursoUsecase
    ): DisciplinasCursoRoute {
        return new DisciplinasCursoRoute(
            "/disciplinas-por-curso",
            HttpMethod.GET,
            disciplinasCursoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const output = await this.disciplinasCursoService.execute();

            response.status(200).json(this.present(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public present(output: DisciplinaCursoOutputDto): any {
        return output.map((item) => ({
            curso: item.curso,
            quantidade_disciplinas: item.quantidade_disciplinas,
        }));
    }
}
