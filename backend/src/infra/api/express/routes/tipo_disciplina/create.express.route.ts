import { Request, Response } from "express";
import {
    CreateTipoDisciplinaInputDto,
    CreateTipoDisciplinaUsecase,
} from "../../../../../usecases/tipo_disciplina/create.usecase";
import { HttpMethod, Route } from "../route";
import { createTipoDisciplinaSchema } from "../../schemas/tipo_disciplina/tipo-disciplina.schema";

export type CreateTipoDisciplinaResponseDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export class CreateTipoDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTipoDisciplinaService: CreateTipoDisciplinaUsecase
    ) {}

    public static create(
        createTipoDisciplinaService: CreateTipoDisciplinaUsecase
    ): CreateTipoDisciplinaRoute {
        return new CreateTipoDisciplinaRoute(
            "/tipos-disciplina",
            HttpMethod.POST,
            createTipoDisciplinaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            createTipoDisciplinaSchema.parse(request.body);

            const { descricao }: CreateTipoDisciplinaInputDto = request.body;

            const input: CreateTipoDisciplinaInputDto = {
                descricao,
            };

            const output: CreateTipoDisciplinaResponseDto =
                await this.createTipoDisciplinaService.execute(input);

            response.status(201).json(this.present(output));
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(
        output: CreateTipoDisciplinaResponseDto
    ): CreateTipoDisciplinaResponseDto {
        return {
            idTipoDisciplina: output.idTipoDisciplina,
            descricao: output.descricao,
        };
    }
}
