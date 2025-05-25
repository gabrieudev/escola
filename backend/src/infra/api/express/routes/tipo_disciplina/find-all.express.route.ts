import { Request, Response } from "express";
import {
    FindAllTipoDisciplinaInputDto,
    FindAllTipoDisciplinaUsecase,
} from "../../../../../usecases/tipo_disciplina/find-all.usecase";
import { HttpMethod, Route } from "../route";
import { TipoDisciplinaProps } from "../../../../../domain/tipo_disciplina/entity/tipo-disciplina";

export type FindAllTipoDisciplinaResponseDto = {
    tiposDisciplina: TipoDisciplinaProps[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
};

export class FindAllTipoDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllTipoDisciplinaUsecase: FindAllTipoDisciplinaUsecase
    ) {}

    public static create(
        findAllTipoDisciplinaUsecase: FindAllTipoDisciplinaUsecase
    ): FindAllTipoDisciplinaRoute {
        return new FindAllTipoDisciplinaRoute(
            "/tipos-disciplina",
            HttpMethod.GET,
            findAllTipoDisciplinaUsecase
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { descricao, page, limit } = request.query as {
                [key: string]: string | null;
            };

            const input: FindAllTipoDisciplinaInputDto = {
                descricao: descricao ?? null,
                page: page ? parseInt(page) : null,
                limit: limit ? parseInt(limit) : null,
            };

            const output: FindAllTipoDisciplinaResponseDto =
                await this.findAllTipoDisciplinaUsecase.execute(input);

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

    private present(
        output: FindAllTipoDisciplinaResponseDto
    ): FindAllTipoDisciplinaResponseDto {
        return {
            tiposDisciplina: output.tiposDisciplina,
            total: output.total,
            page: output.page,
            limit: output.limit,
            totalPages: output.totalPages,
            hasNext: output.hasNext,
        };
    }
}
