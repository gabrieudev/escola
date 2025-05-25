import { Request, Response } from "express";
import {
    DeleteTipoDisciplinaInputDto,
    DeleteTipoDisciplinaUsecase,
} from "../../../../../usecases/tipo_disciplina/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteTipoDisciplinaRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteTipoDisciplinaService: DeleteTipoDisciplinaUsecase
    ) {}

    public static create(
        deleteTipoDisciplinaService: DeleteTipoDisciplinaUsecase
    ): DeleteTipoDisciplinaRoute {
        return new DeleteTipoDisciplinaRoute(
            "/tipos-disciplina",
            HttpMethod.DELETE,
            deleteTipoDisciplinaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idTipoDisciplina }: DeleteTipoDisciplinaInputDto =
                request.body;

            const input: DeleteTipoDisciplinaInputDto = {
                idTipoDisciplina,
            };

            const output = await this.deleteTipoDisciplinaService.execute(
                input
            );

            response.status(204).send(this.present(output));
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(output: any): any {
        return output;
    }
}
