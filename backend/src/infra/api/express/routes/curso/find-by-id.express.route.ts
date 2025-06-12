import { Request, Response } from "express";
import {
    FindByIdCursoInputDto,
    FindByIdCursoUsecase,
} from "../../../../../usecases/curso/find-by-id.usecase";
import { HttpMethod, Route } from "../route";
import { InstituicaoProps } from "../../../../../domain/instituicao/entity/instituicao";
import { TipoCursoProps } from "../../../../../domain/tipo_curso/entity/tipo-curso";

export type FindByIdCursoRouteInputDto = {
    idCurso: number;
    instituicao: InstituicaoProps;
    tipoCurso: TipoCursoProps;
    descricao: string;
};

export class FindByIdCursoRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findCursoByIdService: FindByIdCursoUsecase
    ) {}

    public static create(
        findCursoByIdService: FindByIdCursoUsecase
    ): FindByIdCursoRoute {
        return new FindByIdCursoRoute(
            "/cursos/:idCurso",
            HttpMethod.GET,
            findCursoByIdService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idCurso } = request.params;

            const input: FindByIdCursoInputDto = {
                idCurso: parseInt(idCurso),
            };

            const output = await this.findCursoByIdService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public present(output: any): any {
        return {
            idCurso: output.idCurso,
            instituicao: output.instituicao,
            tipoCurso: output.tipoCurso,
            descricao: output.descricao,
        };
    }
}
