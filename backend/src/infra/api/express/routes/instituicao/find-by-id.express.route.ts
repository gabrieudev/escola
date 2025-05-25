import { Request, Response } from "express";
import {
    FindByIdInstituicaoInputDto,
    FindByIdInstituicaoUsecase,
} from "../../../../../usecases/instituicao/find-by-id.usecase";
import { HttpMethod, Route } from "../route";

export type FindByIdInstituicaoResponseDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export class FindByIdInstituicaoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findByIdInstituicaoService: FindByIdInstituicaoUsecase
    ) {}

    public static create(
        findByIdInstituicaoService: FindByIdInstituicaoUsecase
    ): FindByIdInstituicaoRoute {
        return new FindByIdInstituicaoRoute(
            "/instituicoes/:idInstituicao",
            HttpMethod.GET,
            findByIdInstituicaoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { idInstituicao } = req.params;

            const input: FindByIdInstituicaoInputDto = {
                idInstituicao: parseInt(idInstituicao),
            };

            const output: FindByIdInstituicaoResponseDto =
                await this.findByIdInstituicaoService.execute(input);

            const responseBody = this.present(output);

            res.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public present(
        output: FindByIdInstituicaoResponseDto
    ): FindByIdInstituicaoResponseDto {
        const response = {
            idInstituicao: output.idInstituicao,
            descricao: output.descricao,
            sigla: output.sigla,
        };

        return response;
    }
}
