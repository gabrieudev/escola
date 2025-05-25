import { Request, Response } from "express";
import { CursoProps } from "../../../../../domain/curso/entity/curso";
import {
    FindAllCursoInputDto,
    FindAllCursoUsecase,
} from "../../../../../usecases/curso/find-all.usecase";
import { HttpMethod, Route } from "../route";

export type FindAllCursoResponseDto = {
    cursos: CursoProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllCursoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllCursoService: FindAllCursoUsecase
    ) {}

    public static create(
        findAllCursoService: FindAllCursoUsecase
    ): FindAllCursoRoute {
        return new FindAllCursoRoute(
            "/instituicoes/:idInstituicao/cursos",
            HttpMethod.GET,
            findAllCursoService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { descricao, idTipoCurso, page, limit } = req.query as {
                [key: string]: string | null;
            };
            const { idInstituicao } = req.params as { [key: string]: string };

            const input: FindAllCursoInputDto = {
                descricao: descricao ?? null,
                idInstituicao: idInstituicao ? parseInt(idInstituicao) : null,
                idTipoCurso: idTipoCurso ? parseInt(idTipoCurso) : null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllCursoResponseDto =
                await this.findAllCursoService.execute(input);

            const responseBody = this.present(output);

            res.status(200).json(responseBody).send();
        };
    }

    public getPath() {
        return this.path;
    }

    public getMethod() {
        return this.method;
    }

    private present(output: FindAllCursoResponseDto) {
        return {
            cursos: output.cursos,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };
    }
}
