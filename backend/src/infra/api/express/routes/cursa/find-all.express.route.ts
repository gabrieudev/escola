import { Request, Response } from "express";
import { CursaProps } from "../../../../../domain/cursa/entity/cursa";
import {
    FindAllCursaInputDto,
    FindAllCursaUsecase,
} from "../../../../../usecases/cursa/find-all.usecase";
import { HttpMethod, Route } from "../route";

export type FindAllCursaOutputDto = {
    matriculas: CursaProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllCursaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllCursaService: FindAllCursaUsecase
    ) {}

    public static create(
        findAllCursaService: FindAllCursaUsecase
    ): FindAllCursaRoute {
        return new FindAllCursaRoute(
            "/alunos/:idAluno/matriculas",
            HttpMethod.GET,
            findAllCursaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idDisciplina, page, limit } = request.query as {
                [key: string]: string | null;
            };
            const { idAluno } = request.params as { [key: string]: string };

            const input: FindAllCursaInputDto = {
                idAluno: parseInt(idAluno),
                idDisciplina: idDisciplina ? parseInt(idDisciplina) : null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllCursaOutputDto =
                await this.findAllCursaService.execute(input);

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

    private present(output: FindAllCursaOutputDto): FindAllCursaOutputDto {
        return {
            matriculas: output.matriculas,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };
    }
}
