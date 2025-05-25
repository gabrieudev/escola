import { Request, Response } from "express";
import {
    UpdateInstituicaoInputDto,
    UpdateInstituicaoUsecase,
} from "../../../../../usecases/instituicao/update.usecase";
import { updateInstituicaoSchema } from "../../schemas/instituicao/instituicao.schema";
import { HttpMethod, Route } from "../route";

export type UpdateInstituicaoResponseDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export class UpdateInstituicaoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateInstituicaoService: UpdateInstituicaoUsecase
    ) {}

    public static create(
        updateInstituicaoService: UpdateInstituicaoUsecase
    ): UpdateInstituicaoRoute {
        return new UpdateInstituicaoRoute(
            "/instituicoes",
            HttpMethod.PUT,
            updateInstituicaoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request, response) => {
            updateInstituicaoSchema.parse(request.body);
            const {
                idInstituicao,
                descricao,
                sigla,
            }: UpdateInstituicaoInputDto = request.body;

            const input: UpdateInstituicaoInputDto = {
                idInstituicao,
                descricao,
                sigla,
            };

            const output: UpdateInstituicaoResponseDto =
                await this.updateInstituicaoService.execute(input);

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

    public present(
        output: UpdateInstituicaoResponseDto
    ): UpdateInstituicaoResponseDto {
        const response = {
            idInstituicao: output.idInstituicao,
            descricao: output.descricao,
            sigla: output.sigla,
        };

        return response;
    }
}
