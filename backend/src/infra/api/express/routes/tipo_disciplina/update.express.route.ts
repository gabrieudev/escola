import { Request, Response } from "express";
import {
    UpdateTipoDisciplinaInputDto,
    UpdateTipoDisciplinaUsecase,
} from "../../../../../usecases/tipo_disciplina/update.usecase";
import { HttpMethod, Route } from "../route";
import { updateTipoDisciplinaSchema } from "../../schemas/tipo_disciplina/tipo-disciplina.schema";

export type UpdateTipoDisciplinaResponseDto = {
    idTipoDisciplina: number;
    descricao: string;
};

export class UpdateTipoDisciplinaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTipoDisciplinaService: UpdateTipoDisciplinaUsecase
    ) {}

    public static create(
        updateTipoDisciplinaService: UpdateTipoDisciplinaUsecase
    ): UpdateTipoDisciplinaRoute {
        return new UpdateTipoDisciplinaRoute(
            "/tipos-disciplina",
            HttpMethod.PUT,
            updateTipoDisciplinaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            updateTipoDisciplinaSchema.parse(request.body);

            const {
                idTipoDisciplina,
                descricao,
            }: UpdateTipoDisciplinaInputDto = request.body;

            const input: UpdateTipoDisciplinaInputDto = {
                idTipoDisciplina,
                descricao,
            };

            const output: UpdateTipoDisciplinaResponseDto =
                await this.updateTipoDisciplinaService.execute(input);

            response.status(200).json(this.present(output));
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(
        output: UpdateTipoDisciplinaResponseDto
    ): UpdateTipoDisciplinaResponseDto {
        return {
            idTipoDisciplina: output.idTipoDisciplina,
            descricao: output.descricao,
        };
    }
}
