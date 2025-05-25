import { Request, Response } from "express";
import {
    CreateInstituicaoInputDto,
    CreateInstituicaoUsecase,
} from "../../../../../usecases/instituicao/create.usecase";
import { createInstituicaoSchema } from "../../schemas/instituicao/instituicao.schema";
import { HttpMethod, Route } from "../route";

export type CreateInstituicaoResponseDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export class CreateInstituicaoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createInstituicaoService: CreateInstituicaoUsecase
    ) {}

    public static create(
        createInstituicaoService: CreateInstituicaoUsecase
    ): CreateInstituicaoRoute {
        return new CreateInstituicaoRoute(
            "/instituicoes",
            HttpMethod.POST,
            createInstituicaoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (req: Request, res: Response) => {
            createInstituicaoSchema.parse(req.body);

            const { descricao, sigla }: CreateInstituicaoInputDto = req.body;

            const input: CreateInstituicaoInputDto = {
                descricao,
                sigla,
            };

            const output: CreateInstituicaoResponseDto =
                await this.createInstituicaoService.execute(input);

            const responseBody = this.present(output);

            res.status(201).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(
        output: CreateInstituicaoResponseDto
    ): CreateInstituicaoResponseDto {
        return {
            idInstituicao: output.idInstituicao,
            descricao: output.descricao,
            sigla: output.sigla,
        };
    }
}
