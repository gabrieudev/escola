import { Request, Response } from "express";
import {
    DeleteCursoInputDto,
    DeleteCursoUsecase,
} from "../../../../../usecases/curso/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteCursoService: DeleteCursoUsecase
    ) {}

    public static create(
        deleteCursoService: DeleteCursoUsecase
    ): DeleteCursoRoute {
        return new DeleteCursoRoute(
            "/cursos/:idCurso",
            HttpMethod.DELETE,
            deleteCursoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idCurso } = request.params;

            const input: DeleteCursoInputDto = {
                idCurso: parseInt(idCurso),
            };

            const output = await this.deleteCursoService.execute(input);

            response.status(204).json(this.present(output));
        };
    }

    public getPath() {
        return this.path;
    }

    public getMethod() {
        return this.method;
    }

    private present(output: any) {
        return output;
    }
}
