import { Request, Response } from "express";
import {
    UpdateAlunoInputDto,
    UpdateAlunoUsecase,
} from "../../../../../usecases/aluno/update.usecase";
import { HttpMethod, Route } from "../route";
import { updateAlunoSchema } from "../../schemas/aluno/aluno.schema";

export type UpdateAlunoResponseDto = {
    idAluno: number;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class UpdateAlunoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateAlunoService: UpdateAlunoUsecase
    ) {}

    public static create(updateAlunoService: UpdateAlunoUsecase) {
        return new UpdateAlunoRoute(
            "/alunos",
            HttpMethod.PUT,
            updateAlunoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            updateAlunoSchema.parse({
                ...request.body,
                dtNascimento: new Date(request.body.dtNascimento),
            });

            const { idAluno, nome, sexo, dtNascimento }: UpdateAlunoInputDto =
                request.body;

            const input: UpdateAlunoInputDto = {
                idAluno,
                nome,
                sexo,
                dtNascimento,
            };

            const output: UpdateAlunoResponseDto =
                await this.updateAlunoService.execute(input);

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

    private present(output: UpdateAlunoResponseDto): UpdateAlunoResponseDto {
        const response = {
            idAluno: output.idAluno,
            nome: output.nome,
            sexo: output.sexo,
            dtNascimento: output.dtNascimento,
        };

        return response;
    }
}
