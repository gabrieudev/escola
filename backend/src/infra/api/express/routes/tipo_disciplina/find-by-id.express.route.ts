import { Request, Response } from "express";
import {
    FindByIdTipoDisciplinaInputDto,
    FindByIdTipoDisciplinaUsecase,
} from "../../../../../usecases/tipo_disciplina/find-by-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindByIdTipoDisciplinaResponseDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export class FindByIdTipoDisciplinaRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findByIdTipoDisciplinaUsecase: FindByIdTipoDisciplinaUsecase
    ) {}

    public static create(
        findByIdTipoDisciplinaUsecase: FindByIdTipoDisciplinaUsecase
    ): FindByIdTipoDisciplinaRoute {
        return new FindByIdTipoDisciplinaRoute(
            "/tipos-disciplina/:idTipoDisciplina",
            HttpMethod.GET,
            findByIdTipoDisciplinaUsecase
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idTipoDisciplina } = request.params;

            const input: FindByIdTipoDisciplinaInputDto = {
                idTipoDisciplina: parseInt(idTipoDisciplina),
            };

            const output: FindByIdTipoDisciplinaResponseDto =
                await this.findByIdTipoDisciplinaUsecase.execute(input);

            response.status(200).json(this.present(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(
        output: FindByIdTipoDisciplinaResponseDto
    ): FindByIdTipoDisciplinaResponseDto {
        return {
            idTipoDisciplina: output.idTipoDisciplina,
            descricao: output.descricao,
        };
    }
}
