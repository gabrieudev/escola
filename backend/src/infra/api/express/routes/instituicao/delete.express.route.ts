import { Request, Response } from "express";
import {
    DeleteInstituicaoInputDto,
    DeleteInstituicaoUsecase,
} from "../../../../../usecases/instituicao/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteInstituicaoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteInstituicaoService: DeleteInstituicaoUsecase
    ) {}

    public static create(
        deleteInstituicaoService: DeleteInstituicaoUsecase
    ): DeleteInstituicaoRoute {
        return new DeleteInstituicaoRoute(
            "/instituicoes/:idInstituicao",
            HttpMethod.DELETE,
            deleteInstituicaoService
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response) => {
            const { idInstituicao } = req.params;

            const input: DeleteInstituicaoInputDto = {
                idInstituicao: parseInt(idInstituicao),
            };

            const output = await this.deleteInstituicaoService.execute(input);

            const responseBody = this.present(output);

            res.status(204).send(responseBody);
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    public present(output: any): any {
        return output;
    }
}
